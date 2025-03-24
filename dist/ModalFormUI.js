// src/ModalFormUI.tsx
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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};
const modalVariants = {
    hidden: { opacity: 0, y: "-10%", scale: 0.95 },
    visible: { opacity: 1, y: "0%", scale: 1 },
};
const ModalFormUI = ({ config, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        setLoading(true);
        try {
            const res = yield fetch('https://your-api-endpoint.com/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': config.apiKey,
                },
                body: JSON.stringify(Object.assign(Object.assign({}, formData), { rpcUrl: config.rpcUrl, contractAddress: config.contractAddress })),
            });
            const json = yield res.json();
            config.onResponse(json);
            if ((_a = config.options) === null || _a === void 0 ? void 0 : _a.redirectURL) {
                window.location.href = config.options.redirectURL;
            }
            else {
                onClose();
            }
        }
        catch (err) {
            console.error(err);
        }
        setLoading(false);
    });
    return (_jsx(AnimatePresence, { children: _jsx(motion.div, { className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center", variants: backdropVariants, initial: "hidden", animate: "visible", exit: "hidden", children: _jsxs(motion.div, { className: "bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md mx-auto", variants: modalVariants, initial: "hidden", animate: "visible", exit: "hidden", transition: { duration: 0.25, ease: 'easeInOut' }, children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-xl font-semibold text-zinc-800 dark:text-white", children: "Enter Details" }), _jsx("button", { onClick: onClose, className: "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-lg", children: "\u2715" })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("input", { type: "text", placeholder: "Name", value: formData.name, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { name: e.target.value })), className: "px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/60 backdrop-blur-md shadow-inner text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200" }), _jsx("input", { type: "email", placeholder: "Email", value: formData.email, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { email: e.target.value })), className: "px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/60 backdrop-blur-md shadow-inner text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200" }), _jsx("button", { onClick: handleSubmit, disabled: loading, className: "mt-4 bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed", children: loading ? 'Submitting...' : 'Submit' })] })] }) }) }));
};
export default ModalFormUI;
