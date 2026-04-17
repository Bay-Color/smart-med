import React, { useEffect, useRef, useState } from 'react';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { Card, Spin, Alert, Button, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import type { PatientInfo } from '../mock/api';
import type { ToolType, Annotation } from '../types';

interface DicomViewerProps {
  patient?: PatientInfo;
  dicomUrl?: string;
  activeTool?: ToolType;
  onAnnotationCreate?: (annotation: Annotation) => void;
}

const DicomViewer: React.FC<DicomViewerProps> = ({
  patient,
  dicomUrl,
  activeTool = 'pan',
  onAnnotationCreate,
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDicomImage = async () => {
    const element = viewerRef.current;
    if (!element) return;

    const finalDicomUrl = patient?.dicomUrl || dicomUrl;

    if (!finalDicomUrl) {
      setLoading(false);
      setError('未找到DICOM影像地址');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const image = await cornerstone.loadImage(`wadouri:${finalDicomUrl}`);
      cornerstone.displayImage(element, image);
      setLoading(false);
    } catch (error) {
      setError('影像加载失败，请检查网络连接或文件地址');
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkElement = () => {
      const element = viewerRef.current;
      if (!element) {
        setTimeout(checkElement, 100);
        return;
      }

      cornerstone.enable(element);
      cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

      loadDicomImage();

      return () => {
        cornerstone.disable(element);
      };
    };

    const cleanup = checkElement();

    return cleanup;
  }, [patient, dicomUrl]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onAnnotationCreate || !viewerRef.current) return;

    const rect = viewerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    if (activeTool === 'length') {
      onAnnotationCreate({
        id: Date.now().toString(),
        type: 'length',
        value: `${(Math.random() * 50 + 10).toFixed(2)} mm`,
        position: { x, y },
        timestamp: new Date().toLocaleTimeString(),
      });
    } else if (activeTool === 'angle') {
      onAnnotationCreate({
        id: Date.now().toString(),
        type: 'angle',
        value: `${(Math.random() * 90 + 10).toFixed(2)}°`,
        position: { x, y },
        timestamp: new Date().toLocaleTimeString(),
      });
    } else if (activeTool === 'measure') {
      onAnnotationCreate({
        id: Date.now().toString(),
        type: 'text',
        value: '标注文字',
        position: { x, y },
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  const getCursor = () => {
    switch (activeTool) {
      case 'pan':
        return 'grab';
      case 'zoom':
        return 'zoom-in';
      case 'length':
      case 'angle':
      case 'measure':
        return 'crosshair';
      case 'windowLevel':
        return 'pointer';
      default:
        return 'default';
    }
  };

  return (
    <div
      ref={viewerRef}
      onClick={handleCanvasClick}
      style={{
        width: '100%',
        height: '600px',
        position: 'relative',
        cursor: getCursor(),
      }}
    >
      {loading ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.8)',
          }}
        >
          <Spin size="large" tip="影像加载中..." />
        </div>
      ) : error ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.8)',
          }}
        >
          <Card
            style={{
              width: '80%',
              maxWidth: '500px',
              backgroundColor: '#1a1a1a',
              borderColor: '#333',
            }}
          >
            <Alert
              message="加载失败"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: '16px' }}
            />
            <Space style={{ width: '100%', justifyContent: 'center' }}>
              <Button type="primary" icon={<ReloadOutlined />} onClick={loadDicomImage}>
                重试
              </Button>
            </Space>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default DicomViewer;