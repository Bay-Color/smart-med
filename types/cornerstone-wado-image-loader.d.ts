// types/cornerstone-wado-image-loader.d.ts
declare module 'cornerstone-wado-image-loader' {
  import type * as cornerstone from 'cornerstone-core';
  import type * as dicomParser from 'dicom-parser';

  export interface ExternalDependencies {
    cornerstone: typeof cornerstone;
    dicomParser: typeof dicomParser;
  }

  export const external: ExternalDependencies;

  export namespace webWorkerManager {
    function initialize(config: {
      maxWebWorkers?: number;
      startWebWorkersOnDemand?: boolean;
    }): void;
  }

  export namespace fileManager {
    function add(file: File): string;
  }
}