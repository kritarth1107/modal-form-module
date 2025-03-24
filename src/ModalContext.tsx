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
  // Validate config fields
  if (!config.apiKey?.trim()) {
    throw new ModalFormError('API Key is required.', 'ERR_MISSING_API_KEY');
  }

  if (!config.contractAddress?.trim()) {
    throw new ModalFormError('Contract address is required.', 'ERR_MISSING_CONTRACT_ADDRESS');
  }

  if (!config.rpcUrl?.trim() || !/^https?:\/\/.+/.test(config.rpcUrl)) {
    throw new ModalFormError('Invalid or missing RPC URL. Must be a valid HTTP/HTTPS URL.', 'ERR_INVALID_RPC_URL');
  }

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