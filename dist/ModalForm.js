"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
export const ModalForm = ({ apiKey, rpcUrl, contractAddress, onResponse }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            const res = yield fetch('https://your-api-endpoint.com/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                body: JSON.stringify(Object.assign(Object.assign({}, formData), { rpcUrl,
                    contractAddress })),
            });
            const json = yield res.json();
            onResponse(json);
            setOpen(false);
        }
        catch (err) {
            console.error('Submission error', err);
        }
        setLoading(false);
    });
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setOpen(true), children: "Open Modal" }), open && (_jsx("div", { style: {
                    position: 'fixed', top: 0, left: 0,
                    width: '100vw', height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 1000,
                }, children: _jsxs("div", { style: { background: '#fff', padding: 24, borderRadius: 8, minWidth: 300 }, children: [_jsx("h2", { children: "Enter Details" }), _jsx("input", { type: "text", placeholder: "Name", value: formData.name, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { name: e.target.value })) }), _jsx("br", {}), _jsx("input", { type: "email", placeholder: "Email", value: formData.email, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { email: e.target.value })) }), _jsx("br", {}), _jsx("button", { onClick: handleSubmit, disabled: loading, children: loading ? 'Submitting...' : 'Submit' }), _jsx("button", { onClick: () => setOpen(false), children: "Close" })] }) }))] }));
};
