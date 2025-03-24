import { ReactNode } from 'react';
import { ModalFormConfig } from './types';
interface ModalContextType {
    openModal: () => void;
}
export declare const ModalProvider: ({ children, config }: {
    children: ReactNode;
    config: ModalFormConfig;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useModal: () => ModalContextType;
export {};
