"use client";

export default function FloatingHeader({ title, onBack, onSwap, variant, origin, destination, directionText, directionSubtext }) {
  return (
    <div className="flex w-full flex-col justify-center rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center gap-2 sm:gap-3">
        {onBack && variant !== "direction" && variant !== "arrived" && variant !== "navigation" && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200 sm:h-9 sm:w-9"
          >
            ←
          </button>
        )}

        {variant === "navigation" ? (
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0 flex-1">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10b981] text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                </div>
                <span className="truncate text-sm font-medium text-gray-900">{origin}</span>
              </div>
              <div className="ml-2.5 h-3 border-l-2 border-dotted border-gray-300"></div>
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center text-[#fb7185]">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <span className="truncate text-sm font-medium text-gray-900">{destination || "Destination"}</span>
              </div>
            </div>
            
            <button onClick={onSwap} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M11 18l-4 4-4-4"/><path d="M17 14V2"/><path d="M21 6l-4-4-4 4"/></svg>
            </button>
          </div>
        ) : variant === "direction" ? (
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#f57fa0] text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/></svg>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-[16px] leading-snug font-bold text-[#27272a]">{directionText}</span>
                <span className="truncate text-[14px] text-[#a1a1aa]">{directionSubtext}</span>
              </div>
            </div>
            <button className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-400 hover:text-gray-600 transition">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            </button>
          </div>
        ) : variant === "arrived" ? (
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#f57fa0] text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-[16px] leading-snug font-bold text-[#27272a]">Arrived at {destination || "Destination"}</span>
                <span className="truncate text-[14px] text-[#a1a1aa]">You have arrived!</span>
              </div>
            </div>
            <button className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-400 hover:text-gray-600 transition">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            </button>
          </div>
        ) : (
          <h1 className="text-base font-bold text-gray-900 sm:text-lg">{title}</h1>
        )}
      </div>
    </div>
  );
}