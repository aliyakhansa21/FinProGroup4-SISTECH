"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Mail, Clock } from "lucide-react";

const RESEND_SECONDS = 45;

export default function ForgotPinModal({ onBack, onReset }) {
    const [resendIn, setResendIn] = useState(RESEND_SECONDS);

    useEffect(() => {
        if (resendIn <= 0) return;
        const t = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
        return () => clearInterval(t);
    }, [resendIn]);

    return (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col">
            <div className="px-4 md:px-8 py-3 md:py-4 flex items-center gap-3 border-b border-gray-100">
                <button
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#FDF1F4] text-[#ED6690]"
                >
                <ChevronLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg md:text-xl font-bold text-gray-900">Forgot PIN</h1>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 max-w-md mx-auto w-full space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FDF1F4] flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-[#ED6690]" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 text-sm">Reset link sent</p>
                        <p className="text-xs text-gray-500 mt-0.5">We emailed a•••••@gmail.com a secure reset link.</p>
                    </div>
                </div>

                <p className="text-sm text-gray-500">
                Open the link on your phone to set a new PIN. It expires in 15 minutes.
                </p>

                <div className="bg-[#FDE3EA] rounded-2xl p-4 text-center">
                    <p className="text-xs font-bold text-[#ED6690] tracking-wide">SHARELOCK TIMER</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">Paused</p>
                    <p className="text-xs text-gray-500 mt-1">
                        Your Trusted Circle Has Been Told You&apos;re Resetting Your PIN
                    </p>
                </div>

                <button
                onClick={onReset}
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#F57FA0] to-[#DC4C79] text-white font-bold shadow-md"
                >
                Open email
                </button>

                <p className="text-center text-sm font-semibold text-[#ED6690]">
                {resendIn > 0 ? `Resend in 0:${resendIn.toString().padStart(2, "0")}` : "Resend link"}
                </p>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                    <div className="bg-[#FDF1F4] rounded-2xl p-3 flex gap-3">
                        <Clock className="w-4 h-4 text-[#ED6690] shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-gray-800">Choosing a new PIN</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Avoid birthdays or repeated digits — pick something only you would guess.
                            </p>
                        </div>
                    </div>
                    <div className="bg-[#FDF1F4] rounded-2xl p-3 flex gap-3">
                        <Clock className="w-4 h-4 text-[#ED6690] shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-gray-800">Still stuck?</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Contact Support and we&apos;ll help verify your identity another way.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 