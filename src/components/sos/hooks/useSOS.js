// src/components/sos/hooks/useSOS.js
"use client";

import { useState, useRef } from "react";

export function useSOS() {
  const [step, setStep] = useState("idle"); // idle | holding | sending | shared | completed
  const [holdProgress, setHoldProgress] = useState(0);
  const [emergencyNote, setEmergencyNote] = useState(
    "Hi, ini darurat! Saya mengaktifkan SOS dan mungkin butuh bantuan."
  );

  const holdTimerRef = useRef(null);
  const startTimeRef = useRef(null);

  const startHold = () => {
    if (step !== "idle") return;
    setStep("holding");
    startTimeRef.current = Date.now();

    holdTimerRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const progress = Math.min((elapsedTime / 3000) * 100, 100); // 3 Detik
      setHoldProgress(progress);

      if (progress >= 100) {
        clearInterval(holdTimerRef.current);
        triggerSOS();
      }
    }, 50);
  };

  const cancelHold = () => {
    if (step === "holding") {
      clearInterval(holdTimerRef.current);
      setHoldProgress(0);
      setStep("idle");
    }
  };

  const triggerSOS = () => {
    setHoldProgress(0);
    // PENTING: Hanya ubah step ke "sending"!! 
    // JANGAN panggil navigator.share atau setStep("shared") di sini!
    setStep("sending"); 
  };

  const completeSOS = () => {
    setStep("completed");
  };

  return {
    step,
    setStep,
    holdProgress,
    emergencyNote,
    setEmergencyNote,
    startHold,
    cancelHold,
    triggerSOS,
    completeSOS,
  };
}