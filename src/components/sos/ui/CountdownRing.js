'use client';

import React from 'react';

export default function CountdownRing({
  current = 5,
  total = 5,
  size = 180,
  strokeWidth = 10,
  label = 'Mengirim Sinyal SOS',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, current / total));
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90 drop-shadow-md"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(239, 68, 68, 0.15)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#EF4444"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Center Countdown Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-5xl font-black text-red-600 tracking-tight animate-pulse">
            {current}
          </span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">
            detik
          </span>
        </div>
      </div>

      {label && (
        <p className="mt-4 text-sm font-semibold text-gray-700 text-center animate-bounce">
          {label}
        </p>
      )}
    </div>
  );
}
