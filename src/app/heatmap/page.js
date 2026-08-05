"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

// Memanggil HeatmapView secara dinamis 
const HeatmapView = dynamic(() => import("@/components/heatmap/HeatmapView"), { ssr: false });

const FILTERS = ["All", "Very High", "High", "Medium", "Low"];

export default function HeatmapPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    return (
        <div className="flex flex-col md:flex-row h-[calc(100dvh-72px)] w-full relative overflow-hidden bg-gray-50 rounded-tl-none md:rounded-tl-2xl border-t border-l border-gray-200">
        
            {/* Control Panel (Sidebar Desktop / Floating Card Mobile) */}
            <div className="absolute md:relative top-4 md:top-0 left-4 right-4 md:left-0 md:right-0 md:w-[360px] lg:w-[420px] z-[500] md:z-10 bg-white/95 md:bg-white backdrop-blur-md md:backdrop-blur-none p-4 md:p-6 rounded-3xl md:rounded-none shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:shadow-[4px_0_24px_rgba(0,0,0,0.05)] md:border-r border-gray-100 flex flex-col gap-5 md:h-full shrink-0">
                
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="w-10 h-10 rounded-full bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-colors text-gray-600 hover:text-pink-600 shrink-0"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-[17px] md:text-xl font-bold text-gray-900 leading-tight">
                            Interactive Heatmap
                        </h1>
                        <p className="text-xs md:text-sm text-gray-500 mt-0.5">Live incident visualization</p>
                    </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-3 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1 md:mx-0 md:px-0 md:pb-0">
                    <h3 className="hidden md:block text-sm font-bold text-gray-900 mt-2">Filter by Risk:</h3>
                    <div className="flex flex-row md:flex-wrap gap-2">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`shrink-0 px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold border transition-all ${
                                    activeFilter === filter
                                        ? "bg-[#f57fa0] text-white border-[#f57fa0] shadow-sm"
                                        : "bg-white text-gray-500 border-gray-200 hover:border-pink-300 hover:bg-pink-50"
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Deskripsi tambahan untuk desktop */}
                <div className="hidden md:block mt-auto pb-4">
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
                        <span className="text-xl">💡</span>
                        <p className="text-xs text-blue-700 leading-relaxed font-medium">
                            Heatmap ini membantu kamu menghindari area dengan tingkat insiden yang tinggi. Data diperbarui secara real-time berdasarkan laporan anonim komunitas.
                        </p>
                    </div>
                </div>

            </div>

            {/* Peta */}
            <div className="flex-1 w-full h-full relative z-0">
                <HeatmapView activeFilter={activeFilter} />
            </div>

        </div>
    );
}