"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Search,
    Ban,
    Lightbulb,
    TriangleAlert,
} from "lucide-react";

const CATEGORY_CONFIG = {
    Harassment: { icon: Ban, label: "Harassment reported" },
    "Poor Lighting": { icon: Lightbulb, label: "Poor lighting" },
    "Unsafe Road": { icon: TriangleAlert, label: "Unsafe road" },
    Other: { icon: TriangleAlert, label: "Other" },
};

const FILTERS = ["All", "Harassment", "Poor Lighting", "Unsafe Road"];

const SAFETY_TIPS = [
    {
        title: "Share before you go",
        description: "Send your live journey to a trusted contact the moment you set off.",
    },
    {
        title: "Trust the calm route",
        description: "Well-lit, busier streets add a few minutes but a lot of peace of mind.",
    },
    {
        title: "Check in when home",
        description: "A quick 'I'm safe' lets your circle relax — Asora can send it for you.",
    },
];

export default function ReportDashboardPage() {
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("localReports") || "[]");
        const mapped = local
            .slice()
            .reverse()
            .map((r) => ({
                id: r.id,
                title: r.title || r.category || "Untitled Report",
                category: r.category || "Other",
                locationText: r.locationText || "Unknown Location",
                distance: "Near you",
                timeAgo: "Just now",
                // Menarik data prediksi MLOps
                risk_score: r.risk_score || 0,
                risk_category: r.risk_category || "Low",
            }));
        setReports(mapped);
    }, []);

    const filteredReports = reports.filter((r) => {
        const matchesFilter = activeFilter === "All" || r.category === activeFilter;
        const safeTitle = r.title || "";
        const safeQuery = query || "";
        
        const matchesQuery = safeTitle.toLowerCase().includes(safeQuery.toLowerCase());
        return matchesFilter && matchesQuery;
    });

    const getRiskStyles = (category) => {
        switch(category) {
            case "Very High": return { border: "border-l-red-500", bg: "bg-red-50", text: "text-red-500", badge: "bg-red-100 text-red-700" };
            case "High": return { border: "border-l-orange-500", bg: "bg-orange-50", text: "text-orange-500", badge: "bg-orange-100 text-orange-700" };
            case "Medium": return { border: "border-l-yellow-400", bg: "bg-yellow-50", text: "text-yellow-600", badge: "bg-yellow-100 text-yellow-700" };
            case "Low":
            default: return { border: "border-l-green-400", bg: "bg-green-50", text: "text-green-500", badge: "bg-green-100 text-green-700" };
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-72px)] pb-28 md:pb-12 relative">
            
            {/* App Bar */}
            <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 md:px-8 py-4 flex items-center justify-between gap-3 md:border-b md:border-gray-100 transition-all">
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FDF1F4] text-[#ED6690] hover:bg-[#FCE1E8] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Report</h1>
                </div>
            </div>

            {/* Hero banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#F57FA0] via-[#F06D93] to-[#DC4C79] px-5 pt-3 pb-9 md:rounded-3xl md:mx-8 md:mt-6 md:pt-10 md:pb-16 transition-all">
                <div className="absolute -right-8 -top-10 w-36 md:w-56 h-36 md:h-56 rounded-full bg-white/10" />
                <div className="absolute right-16 md:right-32 bottom-10 w-14 md:w-24 h-14 md:h-24 rounded-full bg-white/10" />

                <div className="relative flex items-center justify-between gap-2 md:px-4">
                    <div className="max-w-[58%] md:max-w-md">
                        <h2 className="text-white text-xl md:text-3xl font-bold leading-snug mb-4 md:mb-6">
                            Spotted something on your way?
                        </h2>
                        <Link
                            href="/report/create"
                            className="inline-flex items-center gap-1.5 bg-white text-[#ED6690] text-sm md:text-base font-semibold md:font-bold px-4 md:px-6 py-2.5 md:py-3.5 rounded-full hover:bg-[#FDF1F4] transition-colors shadow-sm"
                        >
                            Report It
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    <div className="relative w-32 h-28 md:w-48 md:h-44 shrink-0 -mr-2 md:mr-4">
                        <Image
                            src="/report-maskot.png"
                            alt="Report Mascot"
                            fill
                            sizes="(max-width: 768px) 128px, 192px"
                            className="object-contain object-right"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Search + Filter card */}
            <div className="relative z-10 px-4 md:px-14 -mt-8 md:-mt-10">
                <div className="bg-white rounded-3xl shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)] p-3 md:p-5 md:flex md:items-center md:gap-6">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 h-11 md:h-12 md:flex-1">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search updates..."
                            className="flex-1 min-w-0 text-sm md:text-base text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
                        />
                        <Search className="w-4 h-4 text-gray-500 shrink-0" />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pt-3 md:pt-0 -mx-1 px-1 scrollbar-hide shrink-0 md:w-auto">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`shrink-0 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
                                    activeFilter === filter
                                        ? "bg-[#ED6690] text-white border-[#ED6690]"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-[#F7A9BE] hover:bg-pink-50"
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Konten Bawah Grid */}
            <div className="px-4 md:px-8 mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base md:text-lg font-bold text-gray-900">Nearby Reports</h3>
                        <span className="text-xs md:text-sm font-medium text-[#ED6690] bg-[#FDF1F4] px-3 md:px-4 py-1 md:py-1.5 rounded-full">
                            Within 800m
                        </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 mb-4 md:mb-5">Heads-up on what's around you</p>

                    <div className="space-y-3 md:space-y-4 mb-8">
                        {filteredReports.length === 0 && (
                            <p className="text-sm text-gray-400 text-center py-6">No reports match your search.</p>
                        )}
                        {filteredReports.map((report) => {
                            const config = CATEGORY_CONFIG[report.category] || CATEGORY_CONFIG.Other;
                            const Icon = config.icon;
                            const styles = getRiskStyles(report.risk_category); // Menggunakan warna dinamis

                            return (
                                <Link
                                    key={report.id}
                                    href={`/report/${report.id}`}
                                    className={`flex items-center gap-3 bg-white border border-gray-100 border-l-4 ${styles.border} rounded-2xl px-4 md:px-5 py-3.5 md:py-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_14px_-4px_rgba(0,0,0,0.1)] transition-shadow`}
                                >
                                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${styles.bg} flex items-center justify-center shrink-0`}>
                                        <Icon className={`w-4 h-4 md:w-5 md:h-5 ${styles.text}`} strokeWidth={2.5} />
                                    </div>
                                    <div className="flex-1 min-w-0 ml-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm md:text-base font-semibold text-gray-900 truncate">{report.title}</p>
                                            <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold ${styles.badge}`}>
                                                {report.risk_category}
                                            </span>
                                        </div>
                                        <p className="text-xs md:text-sm text-gray-400 truncate mt-0.5">{report.locationText}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-xs md:text-sm font-medium text-gray-500">{report.distance}</p>
                                        <p className="text-[11px] md:text-xs text-gray-400 mt-0.5">{report.timeAgo}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="md:col-span-1 md:sticky md:top-24 md:h-fit">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Daily Safety Tip</h3>
                    <div className="bg-white border border-gray-100 rounded-2xl p-2 md:p-3 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] space-y-1">
                        {SAFETY_TIPS.map((tip, i) => (
                            <div
                                key={tip.title}
                                className={`flex items-start gap-3 p-3 md:p-4 rounded-xl hover:bg-gray-50 transition-colors ${
                                    i !== SAFETY_TIPS.length - 1 ? "border-b border-gray-50 md:border-gray-100" : ""
                                }`}
                            >
                                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#FDF1F4] flex items-center justify-center shrink-0">
                                    <span className="text-base md:text-lg">☁️</span>
                                </div>
                                <div>
                                    <p className="text-sm md:text-base font-semibold text-gray-900">{tip.title}</p>
                                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed mt-0.5">{tip.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}