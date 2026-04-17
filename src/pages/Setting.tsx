import React, { useState } from 'react';
import { Card, Form, Input, Button, Switch, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Setting: React.FC = () => {
  const [form] = Form.useForm();
  const [darkMode, setDarkMode] = useState(true); // 模拟主题设置

  // 面试考点：AntD表单提交
  const onFinish = (values: any) => {
    console.log('设置保存：', values);
    alert('系统设置已保存！');
  };

  return (
    <Card title={<Title level={4}><SettingOutlined /> 系统设置</Title>} style={{ margin: '16px' }}>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ darkMode }}>
        <Form.Item label="服务器地址" name="serverUrl" rules={[{ required: true, message: '请输入服务器地址' }]}>
          <Input placeholder="如：http://192.168.1.100:8080" />
        </Form.Item>
        <Form.Item label="暗色主题（阅片推荐）" name="darkMode" valuePropName="checked">
          <Switch checked={darkMode} onChange={setDarkMode} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">保存设置</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Setting;