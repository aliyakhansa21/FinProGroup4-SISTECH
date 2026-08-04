// src/components/sos/ui/SOSButton.js
"use client";

export default function SOSButton({ onStartHold, onCancelHold, progress, isHolding }) {
  return (
    <div className="flex flex-col items-center gap-3 my-4">
      {/* Container utama dengan ukuran pasti 192px x 192px (w-48 h-48) */}
      <div className="relative flex h-48 w-48 items-center justify-center">
        {/* Ring Indikator Kemajuan SVG */}
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            className="stroke-gray-100"
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

        {/* Tombol SOS Lingkaran Merah */}
        <button
          type="button"
          aria-label="Tekan dan tahan 3 detik untuk mengirim SOS Darurat"
          onPointerDown={onStartHold}
          onPointerUp={onCancelHold}
          onPointerLeave={onCancelHold}
          className={`absolute flex h-36 w-36 cursor-pointer select-none flex-col items-center justify-center rounded-full bg-red-600 text-white shadow-md transition-transform active:scale-95 ${
            isHolding ? "animate-pulse" : ""
          }`}
        >
          <span className="text-2xl font-black tracking-wider leading-none">SOS</span>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-wider opacity-90">
            TAHAN 3 DETIK
          </span>
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 max-w-xs">
        {isHolding ? "Tetap tahan selama 3 detik..." : "Tekan dan tahan tombol di atas untuk mengirim peringatan darurat"}
      </p>
    </div>
  );
}