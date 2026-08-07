"use client";

import { AlertCircle } from "lucide-react";

export default function ConfirmModal({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-[24px] bg-white p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
          <AlertCircle className="h-7 w-7 text-[#EE537F]" />
        </div>
        <h3 className="mb-2 text-center text-xl font-extrabold text-gray-900 tracking-tight">{title}</h3>
        <p className="mb-8 text-center text-[15px] leading-relaxed text-gray-500 font-medium">{message}</p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full rounded-full bg-gradient-to-r from-[#F57FA0] to-[#DC4C79] py-3.5 text-[15px] font-bold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="w-full rounded-full bg-gray-100 py-3.5 text-[15px] font-bold text-gray-700 hover:bg-gray-200 transition-colors duration-200"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}