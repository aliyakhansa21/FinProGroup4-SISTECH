"use client";

import { useState } from "react";

import EmergencySheet from "@/components/sos/sheets/EmergencySheet";
import SendingSheet from "@/components/sos/sheets/SendingSheet";
import SentSheet from "@/components/sos/sheets/SentSheet";
import EndedSheet from "@/components/sos/sheets/EndedSheet";
import ConfirmSafeModal from "@/components/sos/modals/ConfirmSafeModal";

export default function SOSPage() {
  const [step, setStep] = useState("emergency");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {step === "emergency" && (
        <EmergencySheet
          onSOS={() => setStep("sending")}
        />
      )}

      {step === "sending" && (
        <SendingSheet
          onFinish={() => setStep("sent")}
        />
      )}

      {step === "sent" && (
        <>
          <SentSheet
            onImSafe={() => setShowModal(true)}
          />

          {showModal && (
            <ConfirmSafeModal
              onCancel={() => setShowModal(false)}
              onConfirm={() => {
                setShowModal(false);
                setStep("ended");
              }}
            />
          )}
        </>
      )}

      {step === "ended" && (
        <EndedSheet />
      )}
    </>
  );
}