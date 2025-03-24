// src/ModalFormUI.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { ModalFormConfig } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: "-10%", scale: 0.95 },
  visible: { opacity: 1, y: "0%", scale: 1 },
};

const ModalFormUI = ({ config, onClose }: { config: ModalFormConfig; onClose: () => void }) => {
  const [stage, setStage] = useState<'loading' | 'error' | 'start' | 'form'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    const validateInputs = async () => {
      if (!config.apiKey || !config.rpcUrl || !config.contractAddress) {
        setErrorMessage('Missing required configuration: apiKey, rpcUrl, or contractAddress');
        setStage('error');
        return;
      }

      try {
        const res = await fetch('https://kritarth.free.beeceptor.com/success', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.apiKey,
          }
        });

        const json = await res.json();

        console.log(json);
        const demoResponse = {
          success:true,
          status:200,
          message:"Success",
        }

        if (json.success && json.status === 200) {
          setStage('start');
        } else {
          setErrorMessage(json.error.message || 'Validation failed.');
          setStage('error');
        }
      } catch (err) {
        setErrorMessage('Server error while validating config.');
        setStage('error');
      }
    };

    validateInputs();
  }, [config]);

  const handleStart = () => setStage('form');

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    try {
      const res = await fetch('https://your-api-endpoint.com/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
        },
        body: JSON.stringify({
          ...formData,
          rpcUrl: config.rpcUrl,
          contractAddress: config.contractAddress,
        }),
      });

      const json = await res.json();
      config.onResponse(json);

      if (config.options?.redirectURL) {
        window.location.href = config.options.redirectURL;
      } else {
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
    setLoadingSubmit(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '32px',
            maxWidth: '380px',
            width: '100%',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {stage === 'loading' && (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      padding: 32,
    }}
  >
    {/* Spinning Loader Circle */}
    <div
      style={{
        width: 48,
        height: 48,
        border: '4px solid #e0e0e0',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />

    {/* Text */}
    <div style={{ fontSize: 16, color: '#555', fontWeight: 500 }}>
      Validating configuration...
    </div>

    {/* Keyframes via inline style tag */}
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)}


          {stage === 'error' && (
            <>
              <h3 style={{ color: 'red', marginBottom: 16 }}>Error</h3>
              <p style={{ fontSize: 14, color: '#333' }}>{errorMessage}</p>
            </>
          )}

          {stage === 'start' && (
            <>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: '#e0e7ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <span role="img" aria-label="logo" style={{ fontSize: 28 }}>
                  🛡️
                </span>
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Identity Verification</h2>
              <p style={{ fontSize: 15, color: '#555', marginBottom: 24, lineHeight: 1.5 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in sapien ut orci facilisis feugiat.
              </p>
              <button
                onClick={handleStart}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 16,
                  border: 'none',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  marginBottom: 8,
                }}
              >
                Start Verification
              </button>
              <p style={{ fontSize: 11, color: '#888', marginBottom: 32 }}>
                By continuing you agree to our terms & conditions.
              </p>
              <div style={{ fontSize: 12, color: '#aaa' }}>© thespidey.com</div>
            </>
          )}

          {stage === 'form' && (
            <>
              <h2 style={{ fontSize: 20, marginBottom: 20 }}>Fill out your details</h2>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  outline: 'none',
                  marginBottom: 12,
                  width: '100%',
                }}
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  outline: 'none',
                  marginBottom: 16,
                  width: '100%',
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={loadingSubmit}
                style={{
                  padding: '12px',
                  background: '#2563eb',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 15,
                  border: 'none',
                  borderRadius: '12px',
                  cursor: loadingSubmit ? 'not-allowed' : 'pointer',
                  opacity: loadingSubmit ? 0.6 : 1,
                  transition: 'opacity 0.2s ease',
                  width: '100%',
                }}
              >
                {loadingSubmit ? 'Submitting...' : 'Submit'}
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalFormUI;