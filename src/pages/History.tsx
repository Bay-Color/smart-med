import React from 'react';
import { Card, Typography, List } from 'antd';

const { Title, Paragraph } = Typography;

const History: React.FC = () => {
  // 模拟历史记录数据
  const historyData = [
    { id: 1, type: '查看影像', patient: '张三', time: '2026-02-10 14:30', doctor: '李医生' },
    { id: 2, type: '添加患者', patient: '李四', time: '2026-02-20 09:15', doctor: '王医生' },
    { id: 3, type: '查看影像', patient: '王五', time: '2026-03-06 16:45', doctor: '李医生' },
    { id: 4, type: '编辑患者信息', patient: '赵六', time: '2026-04-15 11:20', doctor: '王医生' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ background: '#334155', border: 'none' }}>
        <Title level={2} style={{ color: '#f8fafc' }}>历史记录</Title>
        <Paragraph style={{ color: '#cbd5e1' }}>
          最近的操作历史记录：
        </Paragraph>
        <List
          dataSource={historyData}
          renderItem={(item) => (
            <List.Item style={{ background: '#1e293b', marginBottom: '10px', borderRadius: '4px' }}>
              <List.Item.Meta
                title={<span style={{ color: '#f8fafc' }}>{item.type}</span>}
                description={
                  <div style={{ color: '#cbd5e1' }}>
                    <div>患者：{item.patient}</div>
                    <div>时间：{item.time}</div>
                    <div>医生：{item.doctor}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default History;