// src/ModalContext.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
import { ModalFormError } from './types';
import ModalFormUI from './ModalFormUI';
const ModalContext = createContext(undefined);
let sharedConfig;
export const ModalProvider = ({ children, config }) => {
    const [isOpen, setIsOpen] = useState(false);
    sharedConfig = config;
    const openModal = () => {
        var _a;
        if (((_a = config.options) === null || _a === void 0 ? void 0 : _a.mode) === 'link') {
            if (!config.options.redirectURL || !/^https?:\/\//.test(config.options.redirectURL)) {
                throw new ModalFormError('Invalid or missing redirectURL in link mode.', 'ERR_MISSING_REDIRECT_URL');
            }
            window.location.href = 'https://airchains.io';
        }
        else {
            setIsOpen(true);
        }
    };
    const closeModal = () => setIsOpen(false);
    return (_jsxs(ModalContext.Provider, { value: { openModal }, children: [children, isOpen && _jsx(ModalFormUI, { config: sharedConfig, onClose: closeModal })] }));
};
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context)
        throw new Error('useModal must be used within a ModalProvider');
    return context;
};
