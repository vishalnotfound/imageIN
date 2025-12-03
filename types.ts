export interface GeneratedImage {
  url: string; // Base64 data URL
  prompt: string;
  timestamp: number;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AppState {
  status: GenerationStatus;
  currentImage: GeneratedImage | null;
  error: string | null;
}
