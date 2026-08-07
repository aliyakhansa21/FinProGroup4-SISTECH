// src/components/sos/hooks/useSOS.js
"use client";

import { useState, useRef, useEffect } from "react";

export function useSOS() {
  const [step, setStep] = useState("idle"); // idle | holding | sending | shared | completed
  const [holdProgress, setHoldProgress] = useState(0);
  const [emergencyNote, setEmergencyNote] = useState(
    "Hi, I may need help. Please check on me when you can."
  );
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedNote = window.localStorage.getItem("sora_sos_message");
      if (storedNote) {
        setEmergencyNote(storedNote);
      }
    }
  }, []);

  const [sosStartTime, setSosStartTime] = useState(null);
  const [sosStatus, setSosStatus] = useState("successful"); // successful | canceled

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
    setSosStartTime(Date.now());
    setStep("sending"); 
  };

  const completeSOS = (status = "successful") => {
    setSosStatus(status);
    setStep("completed");
  };

  return {
    step,
    setStep,
    holdProgress,
    emergencyNote,
    setEmergencyNote,
    sosStartTime,
    sosStatus,
    startHold,
    cancelHold,
    triggerSOS,
    completeSOS,
  };
}