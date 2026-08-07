"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
    ChevronLeft, 
    MapPin, 
    Clock, 
    User, 
    BadgeCheck, 
    Lightbulb, 
    TriangleAlert, 
    ChevronRight,
} from "lucide-react";

export default function ReportDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [report, setReport] = useState(null);
    const [relatedReports, setRelatedReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("localReports") || "[]");
        const found = local.find((r) => r.id === params.id);
        
        if (found) {
            setReport(found);
            const others = local.filter((r) => r.id !== params.id).slice(0, 2);
            setRelatedReports(others);
        }
        setLoading(false);
    }, [params.id]);

    const formatDateTime = (timestamp) => {
        try {
            const d = new Date(timestamp);
            const dateOpts = { day: 'numeric', month: 'short', year: 'numeric' };
            const timeOpts = { hour: 'numeric', minute: '2-digit', hour12: true };
            return `Reported on ${d.toLocaleDateString('en-GB', dateOpts)} • ${d.toLocaleTimeString('en-US', timeOpts)}`;
        } catch {
            return "Reported recently";
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-pulse w-8 h-8 bg-gray-300 rounded-full"></div></div>;
    }

    if (!report) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
                <p className="text-gray-500 font-medium">Report not found.</p>
                <button onClick={() => router.back()} className="text-[#ED6690] font-bold">Go Back</button>
            </div>
        );
    }

    const riskScore = report.risk_score || 0;
    const safeScore = Math.max(0, 100 - Math.round(riskScore));

    return (
        <div className="w-full min-h-screen bg-[#F9F9F9] pb-12 font-sans relative -mt-6 -mx-4 sm:-mx-6 lg:-mx-8">
            
            {/* App Bar */}
            <div className="sticky top-0 z-40 bg-[#F9F9F9]/90 backdrop-blur-md px-4 md:px-8 py-3 md:py-4 flex items-center gap-4 border-b border-gray-100">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#FDF1F4] text-[#ED6690] hover:bg-[#FCE1E8] transition-colors shrink-0"
                >
                    <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
                </button>
                <h1 className="text-lg md:text-xl font-bold text-gray-900">Report Detail</h1>
            </div>

            {/* Main Content Wrapper */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-4 md:mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    
                    {/* Kiri: Detail Laporan & Laporan Sekitar */}
                    <div className="md:col-span-2 space-y-4 md:space-y-6">
                        
                        {/* Header Card */}
                        <div className="bg-white rounded-3xl p-5 md:p-8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-gray-100">
                            <span className="inline-block px-3 py-1 rounded-full border border-[#F57FA0] text-[#F57FA0] text-xs font-medium mb-3 md:mb-4">
                                {report.category}
                            </span>
                            
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6 leading-snug">
                                {report.title}
                            </h2>
                            
                            <div className="space-y-3 mb-5 md:mb-6">
                                <div className="flex items-start gap-3 md:gap-4">
                                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#ED6690] mt-0.5 md:mt-1 shrink-0" strokeWidth={2.5} />
                                    <p className="text-sm md:text-base text-gray-600 leading-tight">
                                        {report.locationText}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 md:gap-4">
                                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#ED6690] shrink-0" strokeWidth={2.5} />
                                    <p className="text-sm md:text-base text-gray-600">
                                        {formatDateTime(report.timestamp)}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-dashed border-gray-200 my-4 md:my-6" />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 md:gap-3 text-gray-600">
                                    <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gray-100 flex items-center justify-center">
                                        <User className="w-4 h-4 md:w-5 md:h-5 text-gray-500" strokeWidth={2.5} />
                                    </div>
                                    <span className="text-sm md:text-base font-medium">
                                        {report.privacyMode === "anonymous" ? "Anonymous" : "User Profile"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <span className="text-xs md:text-sm font-medium text-gray-500">Verified</span>
                                    <BadgeCheck className="w-4 h-4 md:w-5 md:h-5 text-green-500" strokeWidth={2.5} />
                                </div>
                            </div>
                        </div>

                        {/* Reported Information Card */}
                        <div className="bg-white rounded-3xl p-5 md:p-8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-gray-100">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Reported Information</h3>
                            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                                {report.description || "No additional information was provided for this report. Stay aware when passing through this area."}
                            </p>
                        </div>

                        {/* Dashed Separator (Hanya tampil di mobile, di desktop disembunyikan karena sudah ada grid) */}
                        <div className="border-t border-dashed border-[#F57FA0]/30 my-8 w-[90%] mx-auto md:hidden" />

                        {/* Nearby Related Reports */}
                        <div className="pt-2 md:pt-6">
                            <div className="flex items-center justify-between mb-4 md:mb-6">
                                <h3 className="text-base md:text-xl font-bold text-gray-900">Nearby Related Reports</h3>
                                <span className="text-[10px] md:text-xs font-medium text-[#ED6690] bg-[#FDF1F4] px-2.5 md:px-3 py-1 md:py-1.5 rounded-full">
                                    Within 800m
                                </span>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                {relatedReports.length === 0 && (
                                    <p className="text-sm md:text-base text-gray-400 text-center py-4">No other reports nearby.</p>
                                )}
                                {relatedReports.map((rel) => {
                                    const isPoorLighting = rel.category === "Poor Lighting";
                                    const Icon = isPoorLighting ? Lightbulb : TriangleAlert;
                                    
                                    return (
                                        <Link
                                            key={rel.id}
                                            href={`/report/${rel.id}`}
                                            className="flex items-center justify-between bg-white border border-gray-100 border-l-4 border-l-red-500 rounded-2xl p-4 md:p-5 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start gap-3 md:gap-4">
                                                <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5" strokeWidth={2.5} />
                                                <div>
                                                    <p className="text-sm md:text-base font-bold text-gray-900">{rel.title}</p>
                                                    <p className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1 truncate max-w-[160px] md:max-w-xs">{rel.locationText}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-block border border-[#F57FA0]/40 text-[#F57FA0] text-[10px] md:text-xs font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full mb-1 md:mb-2">
                                                    {rel.distance || "400 m away"}
                                                </span>
                                                <p className="text-[10px] md:text-xs text-gray-400">{rel.timeAgo || "1 hour ago"}</p>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                    {/* Kanan: Safe Route Map / ML Card */}
                    <div className="md:col-span-1 md:sticky md:top-28 md:h-fit mt-8 md:mt-0">
                        <div className="bg-[#EAE8F4] rounded-3xl overflow-hidden relative min-h-[280px] md:min-h-[360px] flex flex-col justify-end shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
                            {/* Simulated Map Background Elements */}
                            <div className="absolute inset-0 z-0 opacity-50">
                                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/50 rounded-xl"></div>
                                <div className="absolute top-10 right-10 w-24 h-24 bg-green-200/50 rounded-xl"></div>
                                <div className="absolute bottom-1/3 left-10 w-40 h-20 bg-white/50 rounded-xl"></div>
                                {/* Fake Pins */}
                                <div className="absolute top-1/2 left-1/3 w-10 h-10 bg-red-400/30 rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                                </div>
                            </div>

                            {/* Safe Score Badge */}
                            <div className="absolute top-4 left-4 z-10 bg-white rounded-full px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-2 shadow-sm">
                                <div className="relative w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F3F4F6" strokeWidth="4" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray={`${safeScore}, 100`} />
                                    </svg>
                                    <span className="absolute text-[9px] md:text-[10px] font-bold text-gray-800">{safeScore}%</span>
                                </div>
                                <span className="text-sm md:text-base font-bold text-gray-900 pr-1">Safe</span>
                            </div>

                            {/* Bottom Sheet Action */}
                            <div className="bg-white p-5 md:p-6 rounded-t-3xl relative z-10 text-center shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
                                <h4 className="text-sm md:text-base font-bold text-gray-900 mb-4 md:mb-5">
                                    Need to travel through this area?
                                </h4>
                                <Link 
                                    href="/safe_route" 
                                    className="w-full h-12 md:h-14 bg-[#F57FA0] text-white rounded-full font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-sm hover:bg-[#ED6690] transition-colors"
                                >
                                    View Safe Route
                                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}