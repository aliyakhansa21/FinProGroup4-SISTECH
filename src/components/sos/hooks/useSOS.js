// src/components/sos/hooks/useSOS.js
"use client";

import { useState, useRef, useEffect } from "react";
import { createSOSSession, shareSOSLink } from "@/services/sosService";

export function useSOS() {
  const [step, setStep] = useState("idle"); // idle | holding | sending | shared | completed
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 100
  const [session, setSession] = useState(null);
  const [emergencyNote, setEmergencyNote] = useState("");

  const holdTimerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Jalankan perhitungan tahan 5 detik
  const startHold = () => {
    if (step !== "idle") return;
    setStep("holding");
    startTimeRef.current = Date.now();

    holdTimerRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const progress = Math.min((elapsedTime / 5000) * 100, 100);
      setHoldProgress(progress);

      if (progress >= 100) {
        clearInterval(holdTimerRef.current);
        triggerSOS();
      }
    }, 50);
  };

  // Lepaskan tahan lebih awal -> reset
  const cancelHold = () => {
    if (step === "holding") {
      clearInterval(holdTimerRef.current);
      setHoldProgress(0);
      setStep("idle");
    }
  };

  // Aktifkan SOS setelah 5 detik tercapai
  const triggerSOS = async () => {
    setStep("sending");
    const newSession = createSOSSession(emergencyNote);
    setSession(newSession);

    // Otomatis picu dialog bagikan native
    await shareSOSLink(newSession.token, emergencyNote);
    setStep("shared");
  };

  // Menghentikan mode SOS (Selesai/Aman)
  const completeSOS = () => {
    setStep("completed");
    if (typeof window !== "undefined") {
      localStorage.removeItem("active_sos_session");
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    };
  }, []);

  return {
    step,
    holdProgress,
    session,
    emergencyNote,
    setEmergencyNote,
    startHold,
    cancelHold,
    completeSOS,
    reShare: () => session && shareSOSLink(session.token, emergencyNote),
  };
}