"use client";

import Image from "next/image";
import { Share, X, Navigation as NavigationIcon } from "lucide-react";

export default function NavigationSheet({
  duration = "18 min",
  distance = "1.4 km",
  message = "I'm right here with you. Well-lit stretch coming up.",
  onShare,
  onEnd,
}) {
  return (
    <section className="flex w-full flex-col rounded-t-[24px] bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      {/* Drag handle */}
      <div className="flex shrink-0 justify-center pt-3 pb-1 lg:hidden">
        <div className="h-1.5 w-12 rounded-full bg-gray-300" />
      </div>

      <div className="flex flex-col px-5 pb-8 pt-3 gap-4">
        {/* Top Info Row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[14px] text-gray-400">Arriving in</span>
            <div className="text-[18px] font-bold text-gray-800">
              {duration} <span className="font-normal text-gray-500">· {distance}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onShare}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-[14px] font-bold text-gray-800 shadow-sm transition hover:bg-gray-50 active:scale-95"
            >
              <Share size={16} />
              <span>Share</span>
            </button>
            <button
              onClick={onEnd}
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[14px] font-bold text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 active:scale-95"
            >
              <X size={16} />
              <span>End</span>
            </button>
          </div>
        </div>

        {/* Message Box */}
        {message && (
          <div className="flex items-center gap-3 rounded-[16px] bg-[#fdf5fc] p-3 text-[#b14c78]">
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">
              <Image 
                 src="/happylove-maskot.png" 
                 alt="Mascot" 
                 width={40} 
                 height={40} 
                 className="object-contain"
               />
            </div>
            <p className="text-[14px] leading-snug font-medium opacity-90">{message}</p>
          </div>
        )}
      </div>
    </section>
  );
}