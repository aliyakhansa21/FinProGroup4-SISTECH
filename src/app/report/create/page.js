"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReportForm from "@/components/report/ReportForm";

export default function CreateReportPage() {
    const router = useRouter();
    const [view, setView] = useState("form");

    return (
        <div className="w-full min-h-screen relative overflow-hidden -mt-6 -mx-4 sm:-mx-6 lg:-mx-8">
            
            {view === "form" && (
                <>
                    {/* App Bar */}
                    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
                        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex items-center gap-3">
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
                    </div>

                    <div className="px-4 sm:px-6 lg:px-8 mt-4 md:mt-8 pb-12 w-full max-w-2xl mx-auto">
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
                        <div className="relative w-32 h-28 md:w-48 md:h-44 shrink-0 -mr-2 md:mr-4">
                            <Image
                                src="/happylove-maskot.png"
                                alt="Report Mascot"
                                fill
                                sizes="(max-width: 768px) 128px, 192px"
                                className="object-contain object-right"
                                priority
                            />
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