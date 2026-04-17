import React from 'react';
import { Card, Typography, List, Tag, Space, Button } from 'antd';
import {
  LineHeightOutlined,
  ScanOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import type { Annotation } from '../types';

const { Title, Text } = Typography;

interface AnnotationPanelProps {
  annotations: Annotation[];
  onDeleteAnnotation: (id: string) => void;
  onClearAll: () => void;
}

const AnnotationPanel: React.FC<AnnotationPanelProps> = ({
  annotations,
  onDeleteAnnotation,
  onClearAll,
}) => {
  const getAnnotationIcon = (type: string) => {
    switch (type) {
      case 'length':
        return <LineHeightOutlined />;
      case 'angle':
        return <ScanOutlined />;
      case 'text':
        return <EditOutlined />;
      default:
        return <EditOutlined />;
    }
  };

  const getAnnotationColor = (type: string) => {
    switch (type) {
      case 'length':
        return 'green';
      case 'angle':
        return 'blue';
      case 'text':
        return 'orange';
      default:
        return 'default';
    }
  };

  const getAnnotationLabel = (type: string) => {
    switch (type) {
      case 'length':
        return '长度测量';
      case 'angle':
        return '角度测量';
      case 'text':
        return '文字标注';
      default:
        return '未知';
    }
  };

  return (
    <Card
      title={<Title level={5} style={{ color: '#f8fafc', margin: 0 }}>标注信息</Title>}
      size="small"
      extra={
        annotations.length > 0 && (
          <Button size="small" danger onClick={onClearAll}>
            清除全部
          </Button>
        )
      }
      style={{
        background: '#334155',
        border: '1px solid #475569',
        height: '100%',
      }}
      styles={{
        body: { padding: '0' }
      }}
    >
      {annotations.length === 0 ? (
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <Text type="secondary">暂无标注信息</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            选择测量工具在影像上添加标注
          </Text>
        </div>
      ) : (
        <List
          size="small"
          dataSource={annotations}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  key="copy"
                  type="text"
                  size="small"
                  icon={<CopyOutlined />}
                  onClick={() => {}}
                />,
                <Button
                  key="delete"
                  type="text"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => onDeleteAnnotation(item.id)}
                />,
              ]}
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #475569',
              }}
            >
              <List.Item.Meta
                avatar={
                  <Tag color={getAnnotationColor(item.type)} icon={getAnnotationIcon(item.type)}>
                    {getAnnotationLabel(item.type)}
                  </Tag>
                }
                title={
                  <Space>
                    <Text strong style={{ color: '#f8fafc' }}>
                      {item.value}
                    </Text>
                  </Space>
                }
                description={
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    位置: ({item.position.x}, {item.position.y}) | {item.timestamp}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default AnnotationPanel;