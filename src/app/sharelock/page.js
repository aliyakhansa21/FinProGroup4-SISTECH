"use client";

import { useCallback } from "react";
import ShareSetupForm from "@/components/sharelock/ShareSetupForm";
import ActiveTrackingView from "@/components/sharelock/ActiveTrackingView";
import GracePeriodOverlay from "@/components/sharelock/GracePeriodOverlay";
import SosTriggeredView from "@/components/sharelock/SosTriggeredView";
import { useSharelockSession } from "@/hooks/useSharelockSession";
import { useSharelockTimer } from "@/hooks/useSharelockTimer";

export default function ShareLocationPage() {
    const { session, hydrated, start, update, stop } = useSharelockSession();

    const handleMainExpire = useCallback(() => {
        update({ status: "grace_period", graceStartTime: new Date().toISOString() });
    }, [update]);

    const handleGraceExpire = useCallback(() => {
        update({ status: "sos_triggered" });
    }, [update]);

    const { mainRemainingMs, graceRemainingMs, formatted } = useSharelockTimer(
        session,
        {
        onMainExpire: handleMainExpire,
        onGraceExpire: handleGraceExpire,
        }
    );

    /*  Loading state  */
    if (!hydrated) {
        return (
        <div className="flex items-center justify-center py-32 text-gray-400 text-sm">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-pink-200 border-t-[#ED6690] rounded-full animate-spin" />
                <span>Loading Sharelock…</span>
            </div>
        </div>
        );
    }

    if (!session || session.status === "completed") {
        return (
        <ShareSetupForm
            onStart={({ durationMinutes, pin }) => start({ durationMinutes, pin })}
        />
        );
    }

    if (session.status === "sos_triggered") {
        return (
        <SosTriggeredView
            session={session}
            onResolve={() => {
            update({ status: "completed" });
            stop();
            }}
        />
        );
    }

    return (
        <>
        <ActiveTrackingView
            session={session}
            remainingLabel={formatted(mainRemainingMs)}
            onStop={stop}
            onConfirmedSafe={() => {
            update({ status: "completed" });
            stop();
            }}
        />

        {session.status === "grace_period" && (
            <GracePeriodOverlay
            session={session}
            graceRemainingMs={graceRemainingMs}
            onConfirmSafe={() => {
                update({ status: "completed" });
                stop();
            }}
            onExtend={(minutes) => {
                const base = session.graceStartTime
                ? new Date(session.graceStartTime).getTime()
                : Date.now();
                update({
                graceStartTime: new Date(base + minutes * 60_000).toISOString(),
                graceExtensionsUsed: (session.graceExtensionsUsed ?? 0) + 1,
                });
            }}
            onSosTrigger={() => update({ status: "sos_triggered" })}
            />
        )}
        </>
    );
}