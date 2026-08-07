"use client";

import { useEffect, useState } from "react";
import { Lock, ChevronLeft } from "lucide-react";
import ForgotPinModal from "./ForgotPinModal";
import { MAX_PIN_ATTEMPTS } from "@/lib/sharelock";

const LOCK_DURATION_MS = 15 * 60_000;

export default function ConfirmArrivalModal({
    session,
    title = "Confirm Arrival",
    subtitle = "Confirm it\u2019s you to stop sharing your live location and let your trusted circle know you\u2019re safe.",
    closeable = true,
    lockOnMaxAttempts = true,
    onClose,
    onSuccess,
    onMaxAttemptsReached,
}) {
    const [digits, setDigits] = useState([]);
    const [error, setError] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const [showForgot, setShowForgot] = useState(false);
    const [lockedUntil, setLockedUntil] = useState(null);
    const [lockRemainingMs, setLockRemainingMs] = useState(0);

    // Ticks the 15-minute PIN-locked countdown ring
    useEffect(() => {
        if (!lockedUntil) return;
        const interval = setInterval(() => {
        const remaining = Math.max(0, lockedUntil - Date.now());
        setLockRemainingMs(remaining);
        if (remaining <= 0) {
            setLockedUntil(null);
            setAttempts(0);
            setError(null);
        }
        }, 1000);
        return () => clearInterval(interval);
    }, [lockedUntil]);

    // Auto-validate when 4 digits are entered
    useEffect(() => {
        if (digits.length !== 4) return;

        const entered = digits.join("");
        if (entered === session.pin) {
        onSuccess();
        return;
        }

        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        setDigits([]);

        if (nextAttempts >= MAX_PIN_ATTEMPTS) {
        if (lockOnMaxAttempts) {
            setLockedUntil(Date.now() + LOCK_DURATION_MS);
            setLockRemainingMs(LOCK_DURATION_MS);
        }
        onMaxAttemptsReached?.();
        } else {
        const left = MAX_PIN_ATTEMPTS - nextAttempts;
        setError(
            `Incorrect PIN. ${left} attempt${left === 1 ? "" : "s"} left before lock.`
        );
        }
    }, [digits]);

    const handleKeyPress = (num) => {
        if (digits.length >= 4) return;
        setError(null);
        setDigits((prev) => [...prev, num.toString()]);
    };

    const handleDelete = () => {
        setDigits((prev) => prev.slice(0, -1));
        setError(null);
    };

    const formatLock = (ms) => {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    /* ── Forgot PIN flow ── */
    if (showForgot) {
        return (
        <ForgotPinModal
            onBack={() => setShowForgot(false)}
            onReset={() => {
            setShowForgot(false);
            setLockedUntil(null);
            setAttempts(0);
            setError(null);
            }}
        />
        );
    }

    /* ── Locked state ── */
    if (lockedUntil) {
        return (
        <div className="fixed inset-0 z-[99999] bg-white flex flex-col h-[100dvh]">
            <div className="px-4 md:px-8 py-3 md:py-4 flex items-center gap-3">
            {closeable && onClose && (
                <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#FDF1F4] text-[#ED6690] hover:bg-[#FCE1E8] transition-colors"
                >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                </button>
            )}
            <h1 className="text-lg md:text-xl font-bold text-gray-900">
                {title}
            </h1>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-sm mx-auto text-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#FBD9E2] flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#ED6690]" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">PIN Locked</h2>

            <p className="text-sm text-gray-500">
                Too many incorrect attempts. For your safety, PIN entry is paused
                for a few minutes.
            </p>

            {/* Countdown ring */}
            <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="#FBD9E2"
                    strokeWidth="8"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="#ED4545"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 44}
                    strokeDashoffset={
                    2 * Math.PI * 44 * (1 - lockRemainingMs / LOCK_DURATION_MS)
                    }
                    className="transition-all duration-1000 ease-linear"
                />
                </svg>
                <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-red-500 tabular-nums">
                    {formatLock(lockRemainingMs)}
                </span>
                <span className="text-[11px] text-gray-400">until retry</span>
                </div>
            </div>

            <div className="w-full flex flex-col gap-3 mt-2">
                <button
                disabled
                className="w-full h-14 rounded-full bg-[#F5A9C0] text-white font-bold opacity-60 cursor-not-allowed"
                >
                Enter PIN
                </button>
                <button
                onClick={() => setShowForgot(true)}
                className="w-full h-14 rounded-full border border-[#ED6690] text-[#ED6690] font-bold hover:bg-[#FDF1F4] transition-colors"
                >
                Reset via email instead
                </button>
            </div>

            <p className="text-xs text-gray-400 bg-[#FDF1F4] rounded-2xl px-4 py-3 mt-4">
                This keeps your Sharelock and trusted contacts safe from anyone
                guessing your PIN.
            </p>
            </div>
        </div>
        );
    }

    /* ── Normal PIN entry with custom keypad ── */
    return (
        <div className="fixed inset-0 z-[99999] bg-white flex flex-col h-[100dvh]">
            {/* Header */}
            <div className="px-4 md:px-8 py-3 md:py-4 flex items-center gap-3">
                {closeable && onClose && (
                <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#FDF1F4] text-[#ED6690] hover:bg-[#FCE1E8] transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
                </button>
                )}
                <h1 className="text-lg md:text-xl font-bold text-gray-900">{title}</h1>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center px-6 max-w-sm mx-auto w-full pt-4 pb-8">
                {/* Lock icon */}
                <div className="w-16 h-16 rounded-full bg-[#FBD9E2] flex items-center justify-center mb-4">
                    <Lock className="w-7 h-7 text-[#ED6690]" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Enter your PIN
                </h2>

                <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
                {subtitle}
                </p>

                {/* PIN dots (4 Outline circles) */}
                <div className="flex items-center justify-center gap-5 mb-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                    key={i}
                    className={`w-[22px] h-[22px] rounded-full transition-all duration-200 border-[1.5px] ${
                        i < digits.length
                        ? "bg-[#ED6690] border-[#ED6690] scale-110"
                        : error
                        ? "border-red-500 bg-transparent"
                        : "border-[#ED6690] bg-transparent"
                    }`}
                    />
                ))}
                </div>

                {/* Error message slot (Menjaga layout agar tidak lompat) */}
                <div className="h-6 mt-1 mb-4">
                {error && (
                    <p className="text-xs font-bold text-red-500 text-center">
                    {error}
                    </p>
                )}
                </div>

                {/* Custom numeric keypad */}
                <div className="w-full max-w-[280px] mx-auto mt-auto">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleKeyPress(num)}
                            className="w-16 h-16 sm:w-[72px] sm:h-[72px] mx-auto rounded-full border-[2px] border-[#ED6690] text-gray-900 text-3xl font-semibold flex items-center justify-center hover:bg-[#FDF1F4] active:bg-[#FDE3EA] active:scale-95 transition-all"
                        >
                            {num}
                        </button>
                        ))}

                        {/* Empty space */}
                        <div />

                        {/* 0 */}
                        <button
                        onClick={() => handleKeyPress(0)}
                        className="w-16 h-16 sm:w-[72px] sm:h-[72px] mx-auto rounded-full border-[2px] border-[#ED6690] text-gray-900 text-3xl font-semibold flex items-center justify-center hover:bg-[#FDF1F4] active:bg-[#FDE3EA] active:scale-95 transition-all"
                        >
                        0
                        </button>

                        {/* Backspace (Icon terisi warna gelap) */}
                        <button
                        onClick={handleDelete}
                        className="w-16 h-16 sm:w-[72px] sm:h-[72px] mx-auto rounded-full border-[2px] border-[#ED6690] flex items-center justify-center hover:bg-[#FDF1F4] active:scale-95 transition-all"
                        >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-8 h-8 text-gray-900"
                        >
                            <path fillRule="evenodd" d="M10.828 5.485a2 2 0 0 1 1.414-.585H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6.758a2 2 0 0 1-1.414-.585L4.586 12l6.242-6.515ZM13.5 15.536l-3.536-3.536 3.536-3.536 1.414 1.414L12.828 12l2.086 2.086-1.414 1.414Z" clipRule="evenodd" />
                        </svg>
                        </button>
                    </div>

                    {/* Forgot PIN */}
                    <div className="text-center mt-6">
                        <button
                        onClick={() => setShowForgot(true)}
                        className="text-sm font-semibold text-[#ED6690] underline hover:text-pink-600 transition-colors"
                        >
                        Forgot PIN?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}