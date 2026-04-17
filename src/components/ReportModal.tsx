import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space, Typography, Divider } from 'antd';
import type { PatientInfo } from '../mock/api';
import type { ReportFormValues } from '../types';

const { TextArea } = Input;
const { Title, Text } = Typography;

interface ReportModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: (values: ReportFormValues) => void;
  patient: PatientInfo | null;
}

const ReportModal: React.FC<ReportModalProps> = ({ open, onCancel, onOk, patient }) => {
  const [form] = Form.useForm<ReportFormValues>();

  useEffect(() => {
    if (open && patient) {
      form.setFieldsValue({
        diagnosis: '',
        finding: '',
        suggestion: '',
        impression: '影像未见明显异常' ,
      });
    }
  }, [open, patient, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onOk(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0, color: '#f8fafc' }}>
          生成诊断报告
        </Title>
      }
      open={open}
      onCancel={onCancel}
      width={700}
      footer={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={handleSubmit}>
            生成报告
          </Button>
        </Space>
      }
      style={{ top: 20 }}
      bodyStyle={{ background: '#1e293b', padding: '24px' }}
      maskStyle={{ background: 'rgba(0, 0, 0, 0.7)' }}
    >
      {patient && (
        <>
          <div style={{ marginBottom: '16px' }}>
            <Text strong style={{ color: '#f8fafc' }}>
              患者信息：
            </Text>
            <Text style={{ color: '#cbd5e1', marginLeft: '8px' }}>
              {patient.name} | 编号：{patient.id} | 年龄：{patient.age}岁 | 检查类型：{patient.type}
            </Text>
          </div>
          <Divider style={{ borderColor: '#475569' }} />
        </>
      )}

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          impression: '影像未见明显异常',
        }}
      >
        <Form.Item
          label={<Text style={{ color: '#f8fafc' }}>检查所见</Text>}
          name="finding"
          rules={[{ required: true, message: '请填写检查所见' }]}
        >
          <TextArea
            rows={4}
            placeholder="请详细描述影像检查所见..."
            style={{ background: '#334155', borderColor: '#475569', color: '#f8fafc' }}
          />
        </Form.Item>

        <Form.Item
          label={<Text style={{ color: '#f8fafc' }}>诊断意见</Text>}
          name="diagnosis"
          rules={[{ required: true, message: '请选择或填写诊断意见' }]}
        >
          <Select
            mode="tags"
            placeholder="选择或输入诊断意见"
            style={{ width: '100%', background: '#334155' }}
            options={[
              { value: '未见明显异常', label: '未见明显异常' },
              { value: '需要进一步检查', label: '需要进一步检查' },
              { value: '疑似良性病变', label: '疑似良性病变' },
              { value: '疑似恶性病变', label: '疑似恶性病变' },
              { value: '建议定期复查', label: '建议定期复查' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={<Text style={{ color: '#f8fafc' }}>影像表现</Text>}
          name="impression"
          rules={[{ required: true, message: '请填写影像表现' }]}
        >
          <Input
            placeholder="请填写影像表现"
            style={{ background: '#334155', borderColor: '#475569', color: '#f8fafc' }}
          />
        </Form.Item>

        <Form.Item
          label={<Text style={{ color: '#f8fafc' }}>建议</Text>}
          name="suggestion"
        >
          <TextArea
            rows={2}
            placeholder="请填写后续建议..."
            style={{ background: '#334155', borderColor: '#475569', color: '#f8fafc' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReportModal;