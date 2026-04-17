import React from 'react';
import { Button, Space, Tooltip, Divider, Dropdown, message } from 'antd';
import type { MenuProps } from 'antd';
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  ExpandOutlined,
  RotateRightOutlined,
  RotateLeftOutlined,
  SwapOutlined,
  LineHeightOutlined,
  ScanOutlined,
 BgColorsOutlined,
  SaveOutlined,
  PrinterOutlined,
  DownloadOutlined,
  FilePdfOutlined,
  EditOutlined,
} from '@ant-design/icons';
import type { ToolType } from '../types';

interface ViewerToolbarProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  onReset: () => void;
  onExportReport: () => void;
  onSaveAnnotations: () => void;
}

const ViewerToolbar: React.FC<ViewerToolbarProps> = ({
  activeTool,
  onToolChange,
  onReset,
  onExportReport,
  onSaveAnnotations,
}) => {
  const handleExportReport = () => {
    message.info('正在生成诊断报告...');
    setTimeout(() => {
      onExportReport();
      message.success('报告已生成！');
    }, 1000);
  };

  const handleSaveAnnotations = () => {
    message.success('标注已保存！');
    onSaveAnnotations();
  };

  const exportItems: MenuProps['items'] = [
    {
      key: 'pdf',
      icon: <FilePdfOutlined />,
      label: '导出为 PDF',
      onClick: handleExportReport,
    },
    {
      key: 'png',
      icon: <DownloadOutlined />,
      label: '导出为 PNG',
      onClick: () => message.info('正在导出PNG...'),
    },
    {
      key: 'dicom',
      icon: <DownloadOutlined />,
      label: '导出为 DICOM',
      onClick: () => message.info('正在导出DICOM...'),
    },
  ];

  return (
    <div
      style={{
        padding: '12px 16px',
        background: '#1e293b',
        borderBottom: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
      }}
    >
      <Space split={<Divider type="vertical" style={{ borderColor: '#475569' }} />}>
        <Tooltip title="平移 (P)">
          <Button
            type={activeTool === 'pan' ? 'primary' : 'default'}
            icon={<ExpandOutlined />}
            onClick={() => onToolChange('pan')}
          />
        </Tooltip>

        <Tooltip title="缩放 (Z)">
          <Button
            type={activeTool === 'zoom' ? 'primary' : 'default'}
            icon={<ZoomInOutlined />}
            onClick={() => onToolChange('zoom')}
          />
        </Tooltip>

        <Tooltip title="窗宽窗位 (W)">
          <Button
            type={activeTool === 'windowLevel' ? 'primary' : 'default'}
            icon={<BgColorsOutlined />}
            onClick={() => onToolChange('windowLevel')}
          />
        </Tooltip>
      </Space>

      <Divider type="vertical" style={{ borderColor: '#475569' }} />

      <Space>
        <Tooltip title="放大">
          <Button icon={<ZoomInOutlined />} onClick={() => message.info('放大')} />
        </Tooltip>
        <Tooltip title="缩小">
          <Button icon={<ZoomOutOutlined />} onClick={() => message.info('缩小')} />
        </Tooltip>
        <Tooltip title="顺时针旋转">
          <Button icon={<RotateRightOutlined />} onClick={() => message.info('顺时针旋转90度')} />
        </Tooltip>
        <Tooltip title="逆时针旋转">
          <Button icon={<RotateLeftOutlined />} onClick={() => message.info('逆时针旋转90度')} />
        </Tooltip>
        <Tooltip title="水平翻转">
          <Button icon={<SwapOutlined />} onClick={() => message.info('水平翻转')} />
        </Tooltip>
      </Space>

      <Divider type="vertical" style={{ borderColor: '#475569' }} />

      <Space>
        <Tooltip title="长度测量">
          <Button
            type={activeTool === 'length' ? 'primary' : 'default'}
            icon={<LineHeightOutlined />}
            onClick={() => onToolChange('length')}
          />
        </Tooltip>
        <Tooltip title="角度测量">
          <Button
            type={activeTool === 'angle' ? 'primary' : 'default'}
            icon={<ScanOutlined />}
            onClick={() => onToolChange('angle')}
          />
        </Tooltip>
        <Tooltip title="文字标注">
          <Button
            type={activeTool === 'measure' ? 'primary' : 'default'}
            icon={<EditOutlined />}
            onClick={() => onToolChange('measure')}
          />
        </Tooltip>
      </Space>

      <Divider type="vertical" style={{ borderColor: '#475569' }} />

      <Space>
        <Tooltip title="重置视图">
          <Button icon={<ExpandOutlined />} onClick={onReset}>
            重置
          </Button>
        </Tooltip>
        <Tooltip title="保存标注">
          <Button icon={<SaveOutlined />} onClick={handleSaveAnnotations}>
            保存
          </Button>
        </Tooltip>
      </Space>

      <div style={{ marginLeft: 'auto' }}>
        <Space>
          <Dropdown menu={{ items: exportItems }} placement="bottomRight">
            <Button type="primary" icon={<FilePdfOutlined />}>
              导出报告
            </Button>
          </Dropdown>
          <Tooltip title="打印报告">
            <Button icon={<PrinterOutlined />} onClick={() => message.info('正在准备打印...')} />
          </Tooltip>
        </Space>
      </div>
    </div>
  );
};

export default ViewerToolbar;