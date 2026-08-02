"use client";

export default function ConfirmModal({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
        <h3 className="mb-2 text-center text-lg font-bold text-gray-900">{title}</h3>
        <p className="mb-6 text-center text-sm text-gray-500">{message}</p>
        
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}