"use client";

export default function FloatingHeader({ title, onBack, variant, origin, destination, directionText, directionSubtext }) {
  return (
    <div className="flex w-full flex-col justify-center rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center gap-2 sm:gap-3">
        {onBack && variant !== "direction" && variant !== "arrived" && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200 sm:h-9 sm:w-9"
          >
            ←
          </button>
        )}

        {variant === "navigation" ? (
          <div className="flex w-full flex-col gap-1.5 sm:gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-green-500 text-[8px] text-white sm:h-4 sm:w-4 sm:text-[10px]">↑</div>
              <span className="truncate text-xs font-medium text-gray-900 sm:text-sm">{origin}</span>
            </div>
            <div className="ml-1.5 h-3 border-l-2 border-dotted border-gray-300 sm:ml-2 sm:h-4"></div>
            <div className="flex items-center gap-2">
              <div className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-red-500 text-[8px] text-white sm:h-4 sm:w-4 sm:text-[10px]">📍</div>
              <span className="truncate text-xs font-medium text-gray-900 sm:text-sm">{destination || "Destination"}</span>
            </div>
          </div>
        ) : variant === "direction" ? (
          <div className="flex w-full items-center gap-2 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-400 text-xl text-white sm:h-12 sm:w-12 sm:text-2xl">
              ↱
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-bold text-gray-900 sm:text-base">{directionText}</span>
              <span className="truncate text-xs text-gray-500 sm:text-sm">{directionSubtext}</span>
            </div>
            <button className="flex h-8 w-8 shrink-0 items-center justify-center text-lg text-gray-400 sm:h-10 sm:w-10 sm:text-xl">
              🔊
            </button>
          </div>
        ) : variant === "arrived" ? (
          <div className="flex w-full items-center gap-2 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-400 text-xl text-white sm:h-12 sm:w-12 sm:text-2xl">
              ✓
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-bold text-gray-900 sm:text-base">Arrived at {destination || "Destination"}</span>
              <span className="truncate text-xs text-gray-500 sm:text-sm">You have arrived!</span>
            </div>
            <button className="flex h-8 w-8 shrink-0 items-center justify-center text-lg text-gray-400 sm:h-10 sm:w-10 sm:text-xl">
              🔊
            </button>
          </div>
        ) : (
          <h1 className="text-base font-bold text-gray-900 sm:text-lg">{title}</h1>
        )}
      </div>
    </div>
  );
}