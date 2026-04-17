import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Analytics: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ background: '#334155', border: 'none' }}>
        <Title level={2} style={{ color: '#f8fafc' }}>统计分析</Title>
        <Paragraph style={{ color: '#cbd5e1' }}>
          此处将显示患者数据和影像分析的统计信息，包括：
        </Paragraph>
        <Paragraph style={{ color: '#cbd5e1' }}>
          • 患者数量统计
        </Paragraph>
        <Paragraph style={{ color: '#cbd5e1' }}>
          • 影像类型分布
        </Paragraph>
        <Paragraph style={{ color: '#cbd5e1' }}>
          • 诊断结果分析
        </Paragraph>
        <Paragraph style={{ color: '#cbd5e1' }}>
          • 医生工作效率统计
        </Paragraph>
      </Card>
    </div>
  );
};

export default Analytics;