"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReportForm from "@/components/report/ReportForm";

export default function CreateReportPage() {
    const router = useRouter();
    const [view, setView] = useState("form");

    return (
        <div className="max-w-md md:max-w-3xl mx-auto min-h-screen relative overflow-hidden md:border-x md:border-gray-100 md:shadow-sm">
            
            {view === "form" && (
                <>
                    {/* App Bar */}
                    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md px-4 md:px-8 py-4 md:py-6 flex items-center gap-3 md:border-b md:border-gray-100 transition-all">
                        <Link
                            href="/report"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FDF1F4] text-[#ED6690] hover:bg-[#FCE1E8] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Report</h1>
                    </div>

                    <div className="px-4 md:px-12 mt-2 md:mt-8 pb-12 w-full max-w-2xl mx-auto">
                        <ReportForm
                            onSubmitStart={() => setView("submitting")}
                            onSubmitSuccess={() => {
                                setView("success");
                            }}
                        />
                    </div>
                </>
            )}

            {view === "submitting" && (
                <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-8">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#ED6690] flex items-center justify-center animate-pulse">
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13.5c2.5 3 6.5 3 9 0"
                            />
                        </svg>
                    </div>
                    <p className="text-sm md:text-base font-medium text-gray-700">Submitting your report...</p>
                </div>
            )}

            {view === "success" && (
                <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FDF1F4] via-[#FDF1F4]/60 to-white">
                    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center -mt-10 md:-mt-16">
                        {/* Mascot */}
                        <div className="relative mb-8 md:mb-10">
                            <span className="absolute -left-6 top-1 text-[#FAC6D4] text-lg md:text-xl">✦</span>
                            <span className="absolute -right-5 top-6 text-[#FAC6D4] text-sm md:text-base">✦</span>
                            <span className="absolute right-0 -top-3 text-[#FAC6D4] text-xs md:text-sm">✦</span>
                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#F7A9BE]/70 flex items-center justify-center relative transition-all">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#FAC6D4] flex flex-col items-center justify-center">
                                    <div className="flex gap-3 mb-1.5 md:mb-2">
                                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-800 block" />
                                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-800 block" />
                                    </div>
                                    <svg className="w-5 h-3 md:w-6 md:h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 8.5c2.8 3.4 7.2 3.4 10 0" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Thank you for looking out 💗</h2>
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-[280px] md:max-w-[360px] mx-auto">
                            Your report is now gently warning others nearby. You&apos;re helping keep the whole
                            community safer, and it stays anonymous.
                        </p>
                    </div>

                    <div className="p-4 md:p-8 pb-8 md:pb-12 max-w-md md:max-w-lg mx-auto w-full">
                        <button
                            onClick={() => router.push("/report")}
                            className="w-full h-14 md:h-16 rounded-2xl md:rounded-3xl bg-[#F57FA0] text-white font-bold text-sm md:text-base shadow-sm hover:bg-[#ED6690] hover:scale-[1.02] transition-all"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}