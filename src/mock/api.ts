// 模拟后端接口，面试时可说明：真实项目中这里替换为真实接口地址
import axios from 'axios';

// 定义患者数据类型（复用全局接口，保证类型统一）
export interface PatientInfo {
  id: string;
  name: string;
  age: number;
  type: string;
  dicomUrl: string; // 新增：DICOM文件地址
}

// 模拟接口请求：获取患者列表
export const getPatientList = async (): Promise<PatientInfo[]> => {
  // 真实项目中替换为：return axios.get('/api/patient/list').then(res => res.data)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'P2026-001', name: '张三', age: 45, type: '胸部CT', dicomUrl: 'https://raw.githubusercontent.com/cornerstonejs/cornerstoneWADOImageLoader/master/testFiles/CT001.dcm' },
        { id: 'P2026-002', name: '李四', age: 52, type: '头部MRI', dicomUrl: 'https://raw.githubusercontent.com/cornerstonejs/cornerstoneWADOImageLoader/master/testFiles/MR001.dcm' },
        { id: 'P2026-003', name: '王五', age: 38, type: '腹部B超', dicomUrl: 'https://raw.githubusercontent.com/cornerstonejs/cornerstoneWADOImageLoader/master/testFiles/US001.dcm' },
      ]);
    }, 500);
  });
};

// 模拟接口请求：获取单个患者信息
export const getPatientById = async (id: string): Promise<PatientInfo | undefined> => {
  const list = await getPatientList();
  return list.find(item => item.id === id);
};
// 把所有导出都暴露出去，避免遗漏
export * from './api';