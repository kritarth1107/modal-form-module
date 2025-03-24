// src/types.ts
export interface ModalFormConfig {
  apiKey: string;
  rpcUrl: string;
  contractAddress: string;
  onResponse: (data: any) => void;
  options?: {
    mode: 'modal' | 'link';
    redirectURL?: string;
  };
}

export class ModalFormError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'ModalFormError';
  }
}