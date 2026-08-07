"use client";

import Image from "next/image";
import { X } from "lucide-react";

export default function ArrivalSheet({ duration, distance, onBackHome, onSafe }) {
  return (
    <section className="flex w-full flex-col items-center rounded-t-[20px] bg-white pt-6 px-5 pb-8 shadow-[0_-2px_16px_rgba(0,0,0,0.07)] relative">
      <button 
        onClick={onBackHome} 
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition"
      >
        <X size={24} strokeWidth={2.5} />
      </button>

      <div className="flex flex-col items-center gap-3 mt-1 w-full max-w-xs">
        <Image 
          src="/happylove-maskot.png" 
          alt="Mascot" 
          width={90} 
          height={90} 
          className="object-contain drop-shadow-sm mb-1"
        />

        <div className="flex flex-col items-center text-center">
          <h2 className="text-[20px] font-extrabold text-[#3a2a3f] leading-snug">
            You've arrived safely 🎉
          </h2>
          <p className="mt-1 text-[14px] text-[#9b8aa3] font-medium">
            {duration} <span className="mx-1">·</span> {distance}
          </p>
        </div>

        <button
          onClick={onBackHome}
          className="mt-3 w-full rounded-[30px] bg-[#f57fa0] py-4 text-[15px] font-bold text-white shadow-[0_2px_16px_rgba(0,0,0,0.07)] transition hover:opacity-90 active:scale-95"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
}