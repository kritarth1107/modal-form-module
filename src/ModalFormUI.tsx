'use client';

import React, { useState } from 'react';
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
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
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
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            fontFamily: 'sans-serif',
          }}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#333' }}>Enter Details</h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                color: '#666',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                marginTop: '16px',
                padding: '12px',
                background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'opacity 0.2s ease',
              }}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalFormUI;
