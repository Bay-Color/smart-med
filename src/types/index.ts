export interface ReportFormValues {
  diagnosis: string;
  finding: string;
  suggestion: string;
  impression: string;
}

export type ToolType = 'pan' | 'zoom' | 'measure' | 'windowLevel' | 'length' | 'angle';

export interface Annotation {
  id: string;
  type: 'length' | 'angle' | 'text';
  value: string;
  position: { x: number; y: number };
  timestamp: string;
}