'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

/**
 * AuthShell — Single-column responsive auth wrapper.
 *
 * Mobile  : Full-screen white card, no chrome
 * Tablet+ : Centered card up to max-w-2xl with nice shadow & rounded corners
 * Desktop : Widens to max-w-3xl; content has generous padding so it
 *           never looks like a constrained phone screen
 */
export default function AuthShell({ children, className = '' }) {
  return (
    /*
     * Outer layer: covers the entire viewport, hides the global app Header,
     * provides a soft gradient background, and allows vertical scroll.
     */
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-white">
      {/* Decorative blobs — visible only on md+ */}
      <div className="pointer-events-none hidden md:block">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-rose-200/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-pink-100/20 blur-2xl" />
      </div>

      {/* Centering wrapper */}
      <div className="relative min-h-full flex items-center justify-center p-0 sm:p-6 md:p-10">

        {/* ── The Card ──
            Mobile  : zero rounding, fills full screen
            Tablet+ : rounded corners, shadow, max-w-2xl
            Desktop : widens further to max-w-3xl with more padding
        */}
        <div
          className={`
            relative flex w-full flex-col bg-white
            min-h-screen sm:min-h-0
            sm:max-w-2xl lg:max-w-3xl
            sm:rounded-[28px] lg:rounded-[36px]
            sm:shadow-2xl sm:shadow-pink-100/60
            sm:border sm:border-pink-100/80
            overflow-hidden
            ${className}
          `}
        >

          {/* Page content */}
          <div className="flex flex-col flex-1 md:px-8 lg:px-16 md:py-4 lg:py-6">
            {children}
          </div>

          {/* Bottom trust badge */}
          <div className="hidden sm:flex items-center justify-center gap-1.5 pb-6 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-pink-300" />
            <span className="text-[11px] text-slate-400 font-medium">
              End-to-end encrypted · Your data stays private
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}