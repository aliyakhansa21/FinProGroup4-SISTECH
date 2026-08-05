"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

// Memanggil HeatmapView secara dinamis 
const HeatmapView = dynamic(() => import("@/components/heatmap/HeatmapView"), { ssr: false });

export default function HeatmapPage() {
    return (
        <div className="flex flex-col h-screen w-full relative">
        
            {/* Floating Header & Tombol Back */}
            <div className="absolute top-4 left-4 z-[500] bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-gray-100">
                <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>
                <h1 className="text-xl font-bold text-gray-900">
                    Interactive Heatmap
                </h1>
                <p className="text-xs text-gray-500 mt-1">Live incident visualization</p>
            </div>

            {/* Wadah Peta */}
            <div className="flex-1 w-full h-full">
                <HeatmapView />
            </div>

        </div>
    );
}