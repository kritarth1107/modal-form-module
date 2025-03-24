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
export declare class ModalFormError extends Error {
    code: string;
    constructor(message: string, code: string);
}
