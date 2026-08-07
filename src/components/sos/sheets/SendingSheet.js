"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SendingSheet({
  onCancel,
  onCountdownEnd,
  isPaused,
}) {
  const [countdown, setCountdown] = useState(5);

  const playTickSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.warn("AudioContext not supported or blocked", e);
    }
  };

  useEffect(() => {
    if (countdown <= 0) {
      onCountdownEnd?.();
      return;
    }
    
    if (isPaused) {
      return;
    }

    playTickSound();

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onCountdownEnd, isPaused]);

  const progress = (countdown / 5) * 100;

  return (
    <div className="flex flex-col gap-6 w-full pb-32">
      
      {/* Top Section - Follows EmergencySheet standard layout to prevent overlap */}
      <div className="w-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] md:shadow-sm md:border-x md:border-b md:border-t-0 md:border-gray-100 rounded-b-[20px] md:rounded-b-3xl md:rounded-t-none flex flex-col items-center px-5 pt-8 pb-10 md:py-12 relative z-10 gap-6">
        
        {/* Header Navigation */}
        <div className="flex items-center gap-3 w-full max-w-sm md:max-w-none justify-start mb-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#fde9f1] text-pink-600 transition hover:bg-pink-200 p-[5px]"
            aria-label="Back"
          >
            <Image src="/back-button.svg" alt="Back" width={28} height={28} className="w-full h-full object-contain" />
          </button>
          <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-[28px]">Emergency SOS</h1>
        </div>

        {/* Main Alert Content */}
        <div className="flex flex-col items-center text-center gap-6 mt-4">
          
          <h2 className="text-[18px] md:text-xl font-bold text-[#27272a] leading-[28px] max-w-[322px]">
            Activating Emergency Mode...
          </h2>
          
          {/* Circular Countdown Using CSS Conic Gradient */}
          <div 
            className="relative flex items-center justify-center w-[182px] h-[182px] rounded-full mx-auto"
            style={{
              background: `conic-gradient(#ef4444 ${progress}%, #e4e4e7 ${progress}%)`
            }}
          >
            <div className="absolute inset-0 m-[20px] bg-white rounded-full flex items-center justify-center shadow-inner">
              <b className="text-[48px] text-[#dc2626] font-bold font-['Plus_Jakarta_Sans'] leading-[48px]">
                {countdown}
              </b>
            </div>
          </div>

          <p className="text-[12px] md:text-sm text-[#9b8aa3] max-w-[362px] leading-[16px] whitespace-pre-wrap px-4">
            The siren will sound when the countdown ends. You'll then continue to WhatsApp.
          </p>

        </div>
      </div>

      {/* Sticky Bottom Navigation - "Cancel SOS" */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-5xl bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)] rounded-t-[28px] border-t border-[#e4e4e7] flex flex-col items-center justify-center p-4 pb-6 z-50">
        <button
          type="button"
          onClick={onCancel}
          className="w-full max-w-sm rounded-[30px] border-2 border-[#f57fa0] bg-white h-[57px] text-[16px] font-bold text-[#f57fa0] flex items-center justify-center transition hover:bg-pink-50"
        >
          Cancel SOS
        </button>
      </div>

    </div>
  );
}