import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import dicomParser from 'dicom-parser';

/**
 * 目的：初始化医疗影像插件
 * 解释：将解析器(dicomParser)注入加载器，让浏览器读懂 .dcm 文件
 */
export function initCornerstone() {
  // 建立关联
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

  // 配置 Web Worker (多线程解析，防止大图卡顿)
  const config = {
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: true,
  };
  cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
}
