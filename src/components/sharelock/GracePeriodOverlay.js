"use client";

import { useState } from "react";
import { AlarmClock } from "lucide-react";
import ConfirmArrivalModal from "./ConfirmArrivalModal";
import { GRACE_PERIOD_MINUTES } from "@/lib/sharelock";

const MAX_EXTENSIONS = 2;
const EXTENSION_MINUTES = 10;

export default function GracePeriodOverlay({
    session,
    graceRemainingMs,
    onConfirmSafe,
    onExtend,
    onSosTrigger,
}) {
    const [step, setStep] = useState("reminder");
    const extensionsUsed = session.graceExtensionsUsed ?? 0;
    const extensionsLeft = MAX_EXTENSIONS - extensionsUsed;

    const formatted = (() => {
        const totalSeconds = Math.max(0, Math.floor(graceRemainingMs / 1000));
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    })();

    const progress = graceRemainingMs / (GRACE_PERIOD_MINUTES * 60_000);

    /* ── PIN entry sub-view ── */
    if (step === "pin") {
        return (
        <ConfirmArrivalModal
            session={session}
            title="Confirm Arrival"
            subtitle="Confirm it&apos;s you to stop sharing your live location and let your trusted circle know you&apos;re safe."
            closeable={false}
            lockOnMaxAttempts={false}
            onSuccess={onConfirmSafe}
            onMaxAttemptsReached={onSosTrigger}
        />
        );
    }

    /* ── Extension confirmation sub-view ── */
    if (step === "extended") {
        return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6 text-center">
            {/* Handle grip */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            <div className="flex flex-col items-center gap-5 max-w-xs w-full">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <AlarmClock className="w-7 h-7 text-green-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900">10 minutes added</h2>

                <p className="text-sm text-gray-500">
                    We&apos;ve paused the countdown. Your circle won&apos;t be notified
                    unless you miss the new check-in time.
                </p>

                <div className="w-full bg-[#FDE3EA] rounded-2xl p-5">
                    <p className="text-[11px] font-bold text-[#ED6690] tracking-wider uppercase">
                    NEW CHECK-IN TIME
                    </p>
                    <p className="text-3xl font-bold text-[#ED6690] mt-2">
                    {new Date(Date.now() + graceRemainingMs).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                    })}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                    Extensions Used Today: {extensionsUsed} Of {MAX_EXTENSIONS}
                    </p>
                </div>

                <button
                    onClick={() => setStep("reminder")}
                    className="w-full h-14 rounded-full bg-gradient-to-r from-[#F57FA0] to-[#DC4C79] text-white font-bold shadow-md hover:opacity-95 transition-all"
                >
                    Got it, keep tracking
                </button>

                <button
                    onClick={() => setStep("pin")}
                    className="text-sm font-semibold text-[#ED6690] hover:underline transition-colors"
                >
                    I&apos;m actually safe now
                </button>
            </div>
        </div>
        );
    }

    /* ── Main reminder view ── */
    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6 text-center">
            {/* Handle grip */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            <div className="flex flex-col items-center gap-5 max-w-xs w-full">
                {/* Warning bell icon */}
                <div className="w-16 h-16 rounded-full bg-[#FDE9C8] flex items-center justify-center">
                    <svg
                        className="w-7 h-7 text-[#E0A429]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                        {/* Small sparkle lines */}
                        <path d="M12 2v1" />
                        <path d="M8 3l1 1" />
                        <path d="M16 3l-1 1" />
                    </svg>
                </div>

                {/* Circular countdown ring */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="none"
                        stroke="#FBEBC8"
                        strokeWidth="8"
                        />
                        <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="none"
                        stroke="#E0A429"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 44}
                        strokeDashoffset={2 * Math.PI * 44 * (1 - progress)}
                        className="transition-all duration-1000 ease-linear"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center px-4">
                        <span className="text-3xl font-bold text-gray-900 tabular-nums">
                        {formatted}
                        </span>
                        <span className="text-[11px] text-gray-400 mt-0.5">
                        until we
                        <br />
                        alert them
                        </span>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                Are you safe, {session?.contactName ? session.contactName.split(" ")[0] : "there"}?
                </h2>

                <p className="text-sm text-gray-500">
                You haven&apos;t checked in yet. If we don&apos;t hear from you,
                we&apos;ll notify your trusted circle automatically.
                </p>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <button
                        onClick={() => setStep("pin")}
                        className="w-full h-14 rounded-full bg-gradient-to-r from-[#F57FA0] to-[#DC4C79] text-white font-bold shadow-md hover:opacity-95 transition-all"
                    >
                        Yes, I&apos;m safe
                    </button>

                    <button
                        onClick={() => {
                        if (extensionsLeft <= 0) return;
                        onExtend(EXTENSION_MINUTES);
                        setStep("extended");
                        }}
                        disabled={extensionsLeft <= 0}
                        className="w-full h-14 rounded-full border border-[#F5B8CB] text-[#ED6690] font-bold hover:bg-pink-50 disabled:opacity-40 transition-colors"
                    >
                        10 more minutes
                    </button>
                </div>
            </div>
        </div>
    );
}