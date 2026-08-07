"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import ConfirmArrivalModal from "./ConfirmArrivalModal";

const HeatmapView = dynamic(
    () => import("@/components/heatmap/HeatmapView"),
    { ssr: false }
);

export default function ActiveTrackingView({
    session,
    remainingLabel,
    onStop,
    onConfirmedSafe,
}) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [copied, setCopied] = useState(false);
    const [origin, setOrigin] = useState("...");

    // Menghindari Hydration Mismatch: Ambil window.location.origin HANYA di sisi Client
    useEffect(() => {
        if (typeof window !== "undefined") {
        setOrigin(window.location.origin);
        }
    }, []);

    const shareableLink = `${origin}/share/${session?.token}`;

    const handleCopyLink = () => {
        if (typeof navigator !== "undefined") {
        navigator.clipboard.writeText(shareableLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full pb-28 md:pb-12 font-sans">
            <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-5 pt-4 md:pt-6">

                {/* LIVE Hero Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#F57FA0] via-[#F06D93] to-[#DC4C79] rounded-3xl p-5 md:p-8 shadow-lg text-white">
                    {/* Cloud mascot */}
                    <div className="absolute top-4 right-2 sm:top-5 sm:right-5 z-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 relative opacity-95">
                        <Image
                            src="/sharelock/cloud-mascot.png"
                            alt="mascot"
                            fill
                            sizes="(max-width: 640px) 6rem, 7rem"
                            className="object-contain"
                        />
                        </div>
                    </div>

                    <div className="relative z-10 w-[70%] sm:w-[75%]">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-white/20 px-3 py-1 rounded-full mb-3 border border-white/10 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                        LIVE — SHARING NOW
                        </span>

                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 leading-tight">
                        You&apos;re sharing your location
                        </h2>

                        <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-5">
                        {session?.contactName ?? "Maya R. and Dad"} can see you moving in
                        real time until you arrive.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 rounded-full bg-white/15 text-[11px] font-semibold border border-white/20 backdrop-blur-sm">
                                Until I Arrive
                            </span>
                            <span className="px-3 py-1.5 rounded-full bg-white/15 text-[11px] font-semibold border border-white/20 backdrop-blur-sm">
                                PIN protected
                            </span>
                        </div>
                    </div>
                </div>

                {/* Countdown Card */}
                <div className="bg-white rounded-3xl p-6 text-center shadow-sm border border-gray-100">
                    <p className="text-xs font-bold text-[#ED6690] tracking-widest uppercase mb-1">
                        SHARING ENDS IN
                    </p>
                    <p className="text-4xl md:text-5xl font-extrabold text-gray-900 tabular-nums tracking-tight">
                        {remainingLabel}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 font-medium">
                        Auto-expires the moment you confirm arrival
                    </p>
                </div>

                {/* ── 3. Map Card (Seamless layout) ── */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    {/* Map area (Tanpa padding putih di dalam) */}
                    <div className="relative h-48 md:h-64 w-full bg-pink-50/50">
                        <div className="absolute inset-0">
                            <HeatmapView key="tracking-map" activeFilter="All" isBackground={true} />
                        </div>

                        {/* Top badges */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between z-10 pointer-events-none">
                            <span className="text-xs font-bold text-[#ED6690] bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                                3 people sharing nearby
                            </span>
                            <span className="text-xs font-bold text-white bg-[#ED6690] px-4 py-2 rounded-full shadow-md">
                                Open Map
                            </span>
                        </div>

                        {/* Avatar markers */}
                        <div className="absolute bottom-8 left-8 z-10 w-11 h-11 rounded-full bg-[#ED6690] text-white flex items-center justify-center font-bold text-sm shadow-lg border-[3px] border-white">
                        MR
                        </div>
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 w-11 h-11 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-lg border-[3px] border-white">
                        D
                        </div>
                        <div className="absolute top-16 right-10 z-10 w-11 h-11 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shadow-lg border-[3px] border-white">
                        JR
                        </div>
                    </div>

                    {/* Shareable link row diletakkan menempel di bawah map */}
                    <div className="px-5 py-4 flex items-center justify-between bg-white z-20">
                        <span className="text-sm text-gray-400 truncate pr-4 font-medium">
                        {shareableLink.replace("http://", "").replace("https://", "")}
                        </span>
                        <button
                        onClick={handleCopyLink}
                        className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full shrink-0 transition-colors ${
                            copied
                            ? "bg-green-100 text-green-700"
                            : "bg-pink-50 text-[#ED6690] hover:bg-pink-100"
                        }`}
                        >
                        {copied ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                        {copied ? "Copied!" : "Private Link"}
                        </button>
                    </div>
                </div>

                {/* ── 4. Trusted Circle ── */}
                <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold text-gray-900">Trusted Circle</h3>
                        <button className="text-[#ED6690] text-sm font-semibold">Manage</button>
                    </div>

                <div className="space-y-4">
                    {/* Maya R */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-[#ED6690] font-bold text-sm">
                            MR
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Maya R</p>
                                <p className="text-xs text-green-600 font-medium">
                                    Sharing 1.2 km away until 9:00 PM
                                </p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="text-[11px] text-gray-400">78%</span>
                                    <div className="flex gap-[2px]">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <div
                                        key={i}
                                        className={`w-1 h-1.5 rounded-full ${
                                            i < 15 ? "bg-green-400" : "bg-gray-200"
                                        }`}
                                        />
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full">
                            Live
                        </span>
                    </div>

                    <div className="h-px bg-gray-100 ml-13" />

                        {/* Dad */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">
                                D
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Dad</p>
                                    <p className="text-xs text-gray-400">Last seen 20 min ago</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full">
                                Live
                            </span>
                        </div>
                    </div>
                </div>

                {/* Revoke Button  */}
                <button
                onClick={onStop}
                className="w-full h-14 rounded-full border border-[#F5B8CB] text-[#ED6690] font-bold hover:bg-pink-50 transition-colors"
                >
                Revoke link &amp; stop sharing
                </button>
            </div>

            {showConfirm && (
                <ConfirmArrivalModal
                session={session}
                closeable
                lockOnMaxAttempts
                onClose={() => setShowConfirm(false)}
                onSuccess={() => {
                    setShowConfirm(false);
                    onConfirmedSafe();
                }}
                />
            )}
        </div>
    );
}