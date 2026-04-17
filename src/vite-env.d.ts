// src/vite-env.d.ts
/// <reference types="vite/client" />

// 一次性声明所有无官方类型的模块，彻底消除 TS 报红
declare module 'cornerstone-core';
declare module 'cornerstone-wado-image-loader';
declare module 'dicom-parser';