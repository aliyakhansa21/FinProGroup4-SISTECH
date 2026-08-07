"use client";

export default function FloatingActions({ onRecenter, onToggleHeatmap, showSOS, onSOS }) {
  return (
    <div className="flex flex-col gap-3">
      {onRecenter && (
        <button
          type="button"
          onClick={onRecenter}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-gray-50"
        >
          📍
        </button>
      )}

      {onToggleHeatmap && (
        <button
          type="button"
          onClick={onToggleHeatmap}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-gray-50"
        >
          🔥
        </button>
      )}

      {showSOS && (
        <div className="relative flex items-center justify-center mt-2 h-[74px] w-[74px]">
          {/* Background Vector Glow (opacity 0.25) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f87171] via-[#ef3030] to-[#e41010] opacity-25 pointer-events-none"></div>
          
          {/* Inner SOS Button */}
          <button
            type="button"
            onClick={onSOS}
            className="relative z-10 flex h-[55px] w-[55px] flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#f87171] via-[#ef3030] to-[#e41010] text-white shadow-[0_2px_30px_rgba(239,48,48,0.3)] transition hover:opacity-90 active:scale-95"
          >
            <span className="text-[20px] mb-0.5">🚨</span>
            <span className="text-[10px] font-bold leading-none tracking-wide">SOS</span>
          </button>
        </div>
      )}
    </div>
  );
}