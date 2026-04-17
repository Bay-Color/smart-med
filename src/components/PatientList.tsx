import React, { useEffect, useState } from 'react';
import { Card, Tag, Button, Space, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { PatientInfo } from '../mock/api';
import { getPatientList } from '../mock/api';
import { useNavigate } from 'react-router-dom'; // 路由跳转

const { Text, Title } = Typography;

const PatientList: React.FC = () => {
  const [patientList, setPatientList] = useState<PatientInfo[]>([]);
  const navigate = useNavigate(); // 面试考点：编程式导航

  // 面试考点：useEffect请求数据（空依赖只执行一次）
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatientList();
      setPatientList(data);
    };
    fetchData();
  }, []);

  // 点击患者跳转到影像查看页面（面试重点：路由传参）
  const goToViewer = (patient: PatientInfo) => {
    navigate(`/viewer/${patient.id}`, { state: patient });
  };

  return (
    <Card title="患者列表" size="small" style={{ margin: '16px' }}>
      {patientList.map((item) => (
        <Card key={item.id} size="small" style={{ marginBottom: '12px' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
              <Space align="center">
                <Avatar icon={<UserOutlined />} size={48} />
                <Space direction="vertical">
                  <Text strong>{item.name}</Text>
                  <Text type="secondary">编号：{item.id} | 年龄：{item.age}岁</Text>
                </Space>
              </Space>
              <Space>
                <Tag color="blue">{item.type}</Tag>
                <Button type="primary" onClick={() => goToViewer(item)}>查看影像</Button>
              </Space>
            </Space>
          </Space>
        </Card>
      ))}
    </Card>
  );
};

export default PatientList;