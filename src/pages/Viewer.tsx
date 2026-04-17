import React, { useEffect, useState } from 'react';
import { Card, Tag, Descriptions, Row, Col, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams, useLocation } from 'react-router-dom';
import DicomViewer from '../components/DicomViewer';
import ViewerToolbar from '../components/ViewerToolbar';
import AnnotationPanel from '../components/AnnotationPanel';
import ReportModal from '../components/ReportModal';
import { getPatientById } from '../mock/api';
import type { PatientInfo } from '../mock/api';
import type { ToolType, Annotation, ReportFormValues } from '../types';

const Viewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [currentPatient, setCurrentPatient] = useState<PatientInfo | undefined>(
    location.state as PatientInfo
  );
  const [activeTool, setActiveTool] = useState<ToolType>('pan');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [reportModalVisible, setReportModalVisible] = useState(false);

  useEffect(() => {
    if (id && !currentPatient) {
      const fetchPatient = async () => {
        try {
          const data = await getPatientById(id);
          setCurrentPatient(data);
        } catch (error) {
          console.error('获取患者详情失败：', error);
        }
      };
      fetchPatient();
    }
  }, [id, currentPatient]);

  if (!currentPatient) {
    return <div style={{ padding: '24px' }}>加载中...</div>;
  }

  const handleToolChange = (tool: ToolType) => {
    setActiveTool(tool);
    message.info(`已切换到${getToolName(tool)}工具`);
  };

  const getToolName = (tool: ToolType): string => {
    const toolNames: Record<ToolType, string> = {
      pan: '平移',
      zoom: '缩放',
      measure: '标注',
      windowLevel: '窗宽窗位',
      length: '长度测量',
      angle: '角度测量',
    };
    return toolNames[tool];
  };

  const handleReset = () => {
    setActiveTool('pan');
    setAnnotations([]);
    message.success('视图已重置');
  };

  const handleExportReport = () => {
    setReportModalVisible(true);
  };

  const handleSaveAnnotations = () => {
    if (annotations.length === 0) {
      message.warning('暂无标注可保存');
      return;
    }
    message.success('标注已保存');
  };

  const handleDeleteAnnotation = (annotationId: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== annotationId));
    message.success('标注已删除');
  };

  const handleClearAllAnnotations = () => {
    setAnnotations([]);
    message.success('已清除全部标注');
  };

  const handleReportSubmit = (values: ReportFormValues) => {
    console.log('报告内容：', values);
    setReportModalVisible(false);
    message.success('诊断报告已生成！');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ViewerToolbar
        activeTool={activeTool}
        onToolChange={handleToolChange}
        onReset={handleReset}
        onExportReport={handleExportReport}
        onSaveAnnotations={handleSaveAnnotations}
      />

      <div style={{ padding: '16px', flex: 1, overflow: 'auto' }}>
        <Row gutter={16}>
          <Col span={17}>
            <Card
              title="当前患者信息"
              size="small"
              style={{ marginBottom: '16px' }}
            >
              <Descriptions column={2} bordered size="small">
                <Descriptions.Item
                  label={
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <UserOutlined style={{ marginRight: '8px' }} /> 姓名
                    </span>
                  }
                >
                  {currentPatient.name}
                </Descriptions.Item>
                <Descriptions.Item label="编号">{currentPatient.id}</Descriptions.Item>
                <Descriptions.Item label="年龄">{currentPatient.age}岁</Descriptions.Item>
                <Descriptions.Item label="检查类型">
                  <Tag color="blue">{currentPatient.type}</Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card
              title="影像渲染区"
              style={{ backgroundColor: '#000', borderColor: '#333' }}
              styles={{ body: { padding: 0 } }}
            >
              <DicomViewer
                patient={currentPatient}
                activeTool={activeTool}
                onAnnotationCreate={(annotation) => {
                  setAnnotations((prev) => [...prev, annotation]);
                }}
              />
            </Card>
          </Col>

          <Col span={7}>
            <AnnotationPanel
              annotations={annotations}
              onDeleteAnnotation={handleDeleteAnnotation}
              onClearAll={handleClearAllAnnotations}
            />
          </Col>
        </Row>
      </div>

      <ReportModal
        open={reportModalVisible}
        onCancel={() => setReportModalVisible(false)}
        onOk={handleReportSubmit}
        patient={currentPatient}
      />
    </div>
  );
};

export default Viewer;