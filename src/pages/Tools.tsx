import React from 'react';
import { Card, Typography, Space, Button } from 'antd';
import { ZoomInOutlined, ScissorOutlined, EyeOutlined, CalculatorOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Tools: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ background: '#334155', border: 'none' }}>
        <Title level={2} style={{ color: '#f8fafc' }}>工具集</Title>
        <Paragraph style={{ color: '#cbd5e1' }}>
          医疗影像分析工具：
        </Paragraph>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button 
            type="primary" 
            icon={<ZoomInOutlined />} 
            size="large" 
            style={{ background: '#0ea5e9', border: 'none', width: '100%', marginBottom: '10px' }}
          >
            影像测量工具
          </Button>
          <Button 
            type="primary" 
            icon={<ScissorOutlined />} 
            size="large" 
            style={{ background: '#0ea5e9', border: 'none', width: '100%', marginBottom: '10px' }}
          >
            影像标注工具
          </Button>
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            size="large" 
            style={{ background: '#0ea5e9', border: 'none', width: '100%', marginBottom: '10px' }}
          >
            影像增强工具
          </Button>
          <Button 
            type="primary" 
            icon={<CalculatorOutlined />} 
            size="large" 
            style={{ background: '#0ea5e9', border: 'none', width: '100%', marginBottom: '10px' }}
          >
            影像分析工具
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Tools;