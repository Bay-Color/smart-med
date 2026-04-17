import React from 'react';
import { Card, Typography, Collapse } from 'antd';

const { Title, Paragraph } = Typography;

const Help: React.FC = () => {
  const items = [
    {
      key: '1',
      label: '如何上传DICOM影像？',
      children: (
        <Paragraph style={{ color: '#cbd5e1' }}>
          1. 点击"患者列表"页面的"添加患者"按钮
          2. 填写患者基本信息
          3. 点击"上传影像"按钮，选择本地DICOM文件
          4. 等待上传完成后，点击"查看影像"按钮进入影像查看页面
        </Paragraph>
      ),
    },
    {
      key: '2',
      label: '如何使用影像测量工具？',
      children: (
        <Paragraph style={{ color: '#cbd5e1' }}>
          1. 进入"影像查看"页面
          2. 点击"工具集"菜单，选择"影像测量工具"
          3. 在影像上点击鼠标左键开始测量，再次点击结束测量
          4. 测量结果会显示在影像旁边
        </Paragraph>
      ),
    },
    {
      key: '3',
      label: '如何导出影像报告？',
      children: (
        <Paragraph style={{ color: '#cbd5e1' }}>
          1. 进入"影像查看"页面
          2. 完成影像分析后，点击页面右上角的"导出报告"按钮
          3. 选择报告格式（PDF或Word）
          4. 点击"导出"按钮，等待下载完成
        </Paragraph>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ background: '#334155', border: 'none' }}>
        <Title level={2} style={{ color: '#f8fafc' }}>帮助中心</Title>
        <Paragraph style={{ color: '#cbd5e1' }}>
          常见问题解答：
        </Paragraph>
        <Collapse 
          items={items} 
          style={{ 
            background: '#1e293b', 
            borderRadius: '4px',
            color: '#f8fafc'
          }}
        />
      </Card>
    </div>
  );
};

export default Help;