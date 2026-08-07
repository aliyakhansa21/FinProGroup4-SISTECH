"use client";

import { useCallback, useEffect, useState } from "react";
import {
    readSession,
    writeSession,
    clearSession,
    createSession,
    SHARELOCK_UPDATE_EVENT,
} from "@/lib/sharelock";

export function useSharelockSession() {
    const [session, setSession] = useState(null);
    const [hydrated, setHydrated] = useState(false);

    const refresh = useCallback(() => {
        setSession(readSession());
    }, []);

    useEffect(() => {
        refresh();
        setHydrated(true);

        const onChange = () => refresh();
        window.addEventListener("storage", onChange);
        window.addEventListener(SHARELOCK_UPDATE_EVENT, onChange);
        return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(SHARELOCK_UPDATE_EVENT, onChange);
        };
    }, [refresh]);

    const start = useCallback((params) => {
        const created = createSession(params);
        setSession(created);
        return created;
    }, []);

    const update = useCallback((patch) => {
        setSession((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...patch };
        writeSession(next);
        return next;
        });
    }, []);

    const stop = useCallback(() => {
        clearSession();
        setSession(null);
    }, []);

    return { session, hydrated, start, update, stop, refresh };
}