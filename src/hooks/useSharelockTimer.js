"use client";

import { useEffect, useMemo, useState } from "react";
import { GRACE_PERIOD_MINUTES } from "@/lib/sharelock";

export function useSharelockTimer(session, callbacks = {}) {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const mainRemainingMs = useMemo(() => {
        if (!session) return 0;
        const start = new Date(session.startTime).getTime();
        const end = start + session.durationMinutes * 60_000;
        return Math.max(0, end - now);
    }, [session, now]);

    const graceRemainingMs = useMemo(() => {
        if (!session?.graceStartTime) return 0;
        const start = new Date(session.graceStartTime).getTime();
        const end = start + GRACE_PERIOD_MINUTES * 60_000;
        return Math.max(0, end - now);
    }, [session, now]);

    const isMainExpired =
        !!session && session.status === "active" && mainRemainingMs <= 0;
    const isGraceExpired =
        !!session && session.status === "grace_period" && graceRemainingMs <= 0;

    useEffect(() => {
        if (isMainExpired) callbacks.onMainExpire?.();
    }, [isMainExpired]);

    useEffect(() => {
        if (isGraceExpired) callbacks.onGraceExpire?.();
    }, [isGraceExpired]);

    const formatted = (ms) => {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        if (h > 0) {
        return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        }
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return { mainRemainingMs, graceRemainingMs, isMainExpired, isGraceExpired, formatted };
}