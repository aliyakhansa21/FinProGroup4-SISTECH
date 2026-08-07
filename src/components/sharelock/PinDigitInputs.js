"use client";

import { useEffect, useRef } from "react";

export default function PinDigitInputs({
    length = 4,
    value,
    onChange,
    error = false,
    disabled = false,
    autoFocus = true,
}) {
    const inputsRef = useRef([]);

    useEffect(() => {
        if (autoFocus) inputsRef.current[0]?.focus();
    }, [autoFocus]);

    const handleChange = (index, raw) => {
        const digit = raw.replace(/\D/g, "").slice(-1);
        const next = [...value];
        next[index] = digit;
        onChange(next);

        if (digit && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !value[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex items-center justify-center gap-4 md:gap-5">
        {Array.from({ length }).map((_, i) => (
            <input
            key={i}
            ref={(el) => {
                inputsRef.current[i] = el;
            }}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={value[i] ?? ""}
            disabled={disabled}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 text-center text-lg font-bold outline-none transition-colors
                ${
                error
                    ? "border-red-400 text-red-500 bg-red-50"
                    : "border-[#F5B8CB] text-gray-900 focus:border-[#ED6690] bg-white"
                }
                disabled:opacity-50`}
            />
        ))}
        </div>
    );
}