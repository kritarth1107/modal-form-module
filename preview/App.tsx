'use client';

import React from 'react';
import { ModalProvider, useModal } from '../src/ModalContext';

const config = {
  apiKey: 'demoKey',
  rpcUrl: 'https://demo.rpc',
  contractAddress: '0xDemo',
  onResponse: (data: any) => {
    console.log('response:', data);
  },
};

const TestUI = () => {
  const { openModal } = useModal();
  return <button onClick={openModal}>Preview Modal</button>;
};

export default function App() {
  return (
    <div className="dark">
      <ModalProvider config={config}>
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 p-8 text-center">
          <h1 className="text-2xl text-zinc-800 dark:text-white">Preview Modal</h1>
          <TestUI />
        </div>
      </ModalProvider>
    </div>
  );
}

