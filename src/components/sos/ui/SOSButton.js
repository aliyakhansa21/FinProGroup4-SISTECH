'use client';

import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export default function SOSButton({
  onClick,
  isCountingDown = false,
  isSent = false,
  size = 'lg',
  label = 'SOS',
  subLabel = 'Tekan untuk Bantuan Darurat',
  disabled = false,
}) {
  const sizeClasses = {
    sm: 'w-24 h-24 text-xl',
    md: 'w-36 h-36 text-2xl',
    lg: 'w-48 h-48 text-4xl',
  };

  const ringSize = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-4">
      {/* Outer Pulsing Aura */}
      <div
        className={`absolute rounded-full transition-all duration-700 ease-out ${
          isCountingDown
            ? 'bg-red-500/30 animate-ping scale-110'
            : isSent
            ? 'bg-red-600/20 animate-pulse'
            : 'bg-red-400/20 group-hover:scale-105'
        } ${ringSize[size]}`}
      />

      {/* Secondary Soft Glow Layer */}
      <div
        className={`absolute rounded-full blur-xl transition-all ${
          isCountingDown || isSent ? 'bg-red-500/40 scale-125' : 'bg-red-500/20'
        } ${ringSize[size]}`}
      />

      {/* Main SOS Button */}
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`relative z-10 flex flex-col items-center justify-center rounded-full font-extrabold text-white shadow-2xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400/50 ${
          sizeClasses[size]
        } ${
          isSent
            ? 'bg-gradient-to-br from-red-600 via-red-700 to-red-900 border-4 border-red-400 shadow-red-600/50'
            : isCountingDown
            ? 'bg-gradient-to-br from-amber-500 via-red-600 to-red-700 border-4 border-amber-300 shadow-red-500/50'
            : 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:to-red-800 border-4 border-white/20 shadow-red-500/40 hover:shadow-red-500/60'
        }`}
        aria-label="SOS Alert Button"
      >
        <div className="flex flex-col items-center justify-center gap-1">
          {isSent ? (
            <ShieldAlert className="w-10 h-10 animate-bounce text-white drop-shadow-md" />
          ) : (
            <AlertTriangle className="w-9 h-9 text-white drop-shadow-md" />
          )}

          <span className="tracking-wider drop-shadow-md">{label}</span>
        </div>
      </button>

      {/* Helper text below button */}
      {subLabel && (
        <p className="mt-4 text-xs sm:text-sm font-medium text-gray-600 text-center max-w-xs">
          {subLabel}
        </p>
      )}
    </div>
  );
}
