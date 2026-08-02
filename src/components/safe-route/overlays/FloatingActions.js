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
        <button
          type="button"
          onClick={onSOS}
          className="mt-2 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-red-500 text-white shadow-[0_4px_14px_rgba(239,68,68,0.5)] transition hover:bg-red-600"
        >
          <span className="text-lg">🚨</span>
          <span className="text-[10px] font-bold leading-none tracking-wide">SOS</span>
        </button>
      )}
    </div>
  );
}