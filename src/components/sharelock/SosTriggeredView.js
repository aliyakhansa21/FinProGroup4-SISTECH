"use client";

import { ChevronLeft, Bell, MapPin, Pencil } from "lucide-react";
import Link from "next/link";

export default function SosTriggeredView({ session, onResolve }) {
    return (
        <div className="fixed inset-0 z-50 bg-[#FFF7F8] overflow-y-auto">
            {/* Header with back button */}
            <div className="px-4 md:px-8 py-3 md:py-4 flex items-center gap-3 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <Link
                href="/sharelock"
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#FDF1F4] text-[#ED6690] hover:bg-[#FCE1E8] transition-colors"
                >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                </Link>
                <h1 className="text-lg md:text-xl font-bold text-gray-900">
                Emergency SOS
                </h1>
            </div>

            <div className="max-w-md mx-auto px-4 md:px-8 py-6 space-y-5">
                {/* Auto-triggered alert banner */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 text-red-500"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 text-sm">Auto-triggered</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                        No check-in received within your grace period
                        </p>
                    </div>
                </div>

                {/* Pulsing SOS circle with bell icon */}
                <div className="flex flex-col items-center gap-4 py-6">
                    <div className="relative w-40 h-40 md:w-44 md:h-44">
                        {/* Outer pulsing ring */}
                        <div className="absolute inset-0 rounded-full bg-red-400/20 animate-ping" />
                        {/* Second ring for depth */}
                        <div className="absolute inset-3 rounded-full bg-red-400/15 animate-pulse" />
                        {/* Main SOS circle */}
                        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#FF6B6B] via-[#EF4444] to-[#DC2626] flex flex-col items-center justify-center text-white shadow-[0_8px_40px_-8px_rgba(239,68,68,0.6)]">
                            <Bell className="w-10 h-10 mb-1.5" strokeWidth={2} />
                            <span className="text-xl font-bold tracking-wider">SOS</span>
                        </div>
                    </div>

                    <div className="text-center mt-2">
                        <p className="text-lg font-bold text-gray-900">
                        Alert sent automatically
                        </p>
                        <p className="text-sm text-gray-500 mt-1.5 max-w-xs">
                        Your trusted circle has been notified and your location shared.
                        </p>
                    </div>
                </div>

                {/* Primary Emergency Contact */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-red-500" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <span className="text-sm font-bold text-gray-900">
                                Primary Emergency Contact
                            </span>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-[#FDF1F4] flex items-center justify-center text-[#ED6690] hover:bg-[#FCE1E8] transition-colors">
                            <Pencil className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="border-t border-dashed border-pink-200 pt-3">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-3 h-3 rounded-full border-2 border-red-400 bg-white absolute -left-1 top-1/2 -translate-y-1/2" />
                                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700 text-sm ml-3">
                                {session?.contactName?.[0] ?? "D"}
                                </div>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">
                                {session?.contactName ?? "Dad"}
                                </p>
                                <p className="text-xs text-gray-400">
                                {session?.contactPhone ?? "+1 (555) 030-4040"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emergency message preview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#ED6690]" />
                            <span className="text-sm font-bold text-gray-900">
                                Emergency message preview
                            </span>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-[#FDF1F4] flex items-center justify-center text-[#ED6690] hover:bg-[#FCE1E8] transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="border-t border-dashed border-pink-200 pt-3">
                        <div className="bg-[#FDF1F4] rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
                            &quot;Hi, I may need help.
                            <br />
                            <br />
                            Please check on me when you can.&quot;
                        </div>
                    </div>
                </div>

                {/* I'm safe now button */}
                <button
                onClick={onResolve}
                className="w-full h-14 rounded-full border border-[#ED6690] text-[#ED6690] font-bold hover:bg-[#FDF1F4] transition-colors mt-2"
                >
                I&apos;m safe now
                </button>
            </div>
        </div>
    );
}