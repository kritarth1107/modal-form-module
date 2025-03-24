
// src/ModalContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ModalFormConfig, ModalFormError } from './types';
import ModalFormUI from './ModalFormUI';

interface ModalContextType {
  openModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);
let sharedConfig: ModalFormConfig;

export const ModalProvider = ({ children, config }: { children: ReactNode; config: ModalFormConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  sharedConfig = config;

  const openModal = () => {
    if (config.options?.mode === 'link') {
      if (!config.options.redirectURL || !/^https?:\/\//.test(config.options.redirectURL)) {
        throw new ModalFormError('Invalid or missing redirectURL in link mode.', 'ERR_MISSING_REDIRECT_URL');
      }
      window.location.href = 'https://airchains.io';
    } else {
      setIsOpen(true);
    }
  };

  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {isOpen && <ModalFormUI config={sharedConfig} onClose={closeModal} />}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
};