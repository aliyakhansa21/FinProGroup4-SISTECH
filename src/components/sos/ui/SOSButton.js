// src/components/sos/ui/SOSButton.js
"use client";

export default function SOSButton({ onStartHold, onCancelHold, progress, isHolding }) {
  return (
    <div className="flex flex-col items-center gap-3 my-6">
      <div className="relative flex items-center justify-center">
        {/* Ring Indikator Kemajuan */}
        <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            className="stroke-gray-200"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            className="stroke-red-500 transition-all duration-75 ease-linear"
            strokeWidth="8"
            strokeDasharray="263.89"
            strokeDashoffset={263.89 - (263.89 * progress) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Tombol Utama */}
        <button
          type="button"
          aria-label="Tekan dan tahan 5 detik untuk mengirim SOS Darurat"
          onPointerDown={onStartHold}
          onPointerUp={onCancelHold}
          onPointerLeave={onCancelHold}
          className={`absolute flex h-36 w-36 cursor-pointer select-none flex-col items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform active:scale-95 ${
            isHolding ? "animate-pulse" : ""
          }`}
        >
          <span className="text-3xl font-black tracking-widest">SOS</span>
          <span className="mt-1 text-xs font-semibold uppercase">Tahan 5 Detik</span>
        </button>
      </div>

      <p className="text-center text-xs text-gray-500 max-w-xs">
        {isHolding ? "Tetap tahan selama 5 detik..." : "Tekan dan tahan tombol di atas untuk mengirim peringatan darurat"}
      </p>
    </div>
  );
}