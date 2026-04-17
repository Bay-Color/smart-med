import React from 'react';
import { Card, Typography, Descriptions } from 'antd';

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ background: '#334155', border: 'none' }}>
        <Title level={2} style={{ color: '#f8fafc' }}>关于我们</Title>
        <Paragraph style={{ color: '#cbd5e1' }}>
          智能医学工程 - 数字化阅片台是一款专业的医疗影像分析系统，旨在帮助医生更高效、准确地诊断疾病。
        </Paragraph>
        <Descriptions style={{ color: '#cbd5e1' }}>
          <Descriptions.Item label="版本">1.0.0</Descriptions.Item>
          <Descriptions.Item label="开发者">智能医学工程团队</Descriptions.Item>
          <Descriptions.Item label="联系方式">6401230109@hmc.edu.cn</Descriptions.Item>
          <Descriptions.Item label="更新时间">2026-04-10</Descriptions.Item>
        </Descriptions>
        <Paragraph style={{ color: '#cbd5e1', marginTop: '20px' }}>
          本系统采用先进的医学影像处理技术，支持DICOM格式影像的加载、显示和分析，为医生提供直观、高效的阅片体验。
        </Paragraph>
      </Card>
    </div>
  );
};

export default About;