"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSOS } from "@/components/sos/hooks/useSOS";
import EmergencySheet from "@/components/sos/sheets/EmergencySheet";
import SendingSheet from "@/components/sos/sheets/SendingSheet";
import SentSheet from "@/components/sos/sheets/SentSheet";
import EndedSheet from "@/components/sos/sheets/EndedSheet";
import ConfirmSafeModal from "@/components/sos/modals/ConfirmSafeModal";
import { playSirenSound, stopSirenSound } from "@/lib/sirenAudio";
import { getStoredContacts, saveStoredContacts } from "@/lib/storage";

const DEFAULT_CONTACTS = [
  { id: "1", name: "Jesse R.", phone: "+6281234567890", avatar: "JR", selected: true, status: "Sending..." },
  { id: "2", name: "Dad", phone: "+6281298765432", avatar: "D", selected: false, status: "Sending..." },
  { id: "3", name: "Maya R.", phone: "+6281311223344", avatar: "MR", selected: false, status: "Sending..." },
];

export default function SOSPage() {
  const router = useRouter();
  const {
    step,
    setStep,
    holdProgress,
    emergencyNote,
    setEmergencyNote,
    startHold,
    cancelHold,
    completeSOS,
    sosStartTime,
    sosStatus,
  } = useSOS();

  const [shareLiveLocation, setShareLiveLocation] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isWaClicked, setIsWaClicked] = useState(false);

  // Form Tambah Kontak
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  const messageInputRef = useRef(null);
  const emergencyNoteRef = useRef(emergencyNote);
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS);

  useEffect(() => {
    emergencyNoteRef.current = emergencyNote;
  }, [emergencyNote]);

  // Nearby Safe Places Data
  const nearbyPlaces = [
    { id: "p1", name: "Police Station", distance: "300 m", icon: "🚓", lat: -6.2088, lng: 106.8456 },
    { id: "p2", name: "Hospital", distance: "450 m", icon: "🏥", lat: -6.2095, lng: 106.8462 },
    { id: "p3", name: "24 Hour Store", distance: "120 m", icon: "🏪", lat: -6.2081, lng: 106.8449 },
  ];

  useEffect(() => {
    let initial = getStoredContacts(DEFAULT_CONTACTS);
    
    // Sanitize to ensure strictly ONE contact is selected
    const selectedIndex = initial.findIndex(c => c.selected);
    const indexToSelect = selectedIndex >= 0 ? selectedIndex : 0;
    
    initial = initial.map((c, i) => ({ ...c, selected: i === indexToSelect }));
    setContacts(initial);
  }, []);

  useEffect(() => {
    if (step === "idle") {
      setIsWaClicked(false);
    }
  }, [step]);

  const updateContactsState = (newContactsList) => {
    setContacts(newContactsList);
    saveStoredContacts(newContactsList);
  };

  const toggleContact = (id) => {
    if (!shareLiveLocation) return;
    const updated = contacts.map((c) =>
      ({ ...c, selected: c.id === id })
    );
    updateContactsState(updated);
  };

  const handleSaveNewContact = () => {
    if (newContact.name.trim() && newContact.phone.trim()) {
      const updated = [
        ...contacts.map(c => ({ ...c, selected: false })),
        {
          id: Date.now().toString(),
          name: newContact.name.trim(),
          phone: newContact.phone.trim(),
          avatar: newContact.name.trim().substring(0, 2).toUpperCase(),
          selected: true,
          status: "Sending...",
        },
      ];
      updateContactsState(updated);
      setNewContact({ name: "", phone: "" });
      setIsAddingContact(false);
    }
  };

  // Control Sirine Audio
  useEffect(() => {
    if (step === "idle" || step === "holding" || step === "completed") {
      stopSirenSound();
    }
    return () => stopSirenSound();
  }, [step]);

  // Bypass langsung ke Screen 3 jika Share Location Unchecked
  useEffect(() => {
    if (step === "sending" && !shareLiveLocation) {
      setStep("shared");
    }
  }, [step, shareLiveLocation, setStep]);

  const handleOpenWhatsApp = () => {
    setIsWaClicked(true);

    const sendWA = (lat, lng) => {
      const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
      const defaultMsg = "Hi, I may need help. Please check on me when you can.";
      const textToSend = `${emergencyNoteRef.current || defaultMsg}\n\n📍 GPS Location:\n${mapsUrl}`;

      const selectedContacts = contacts.filter((c) => c.selected);
      const firstPhone = selectedContacts.length > 0 ? selectedContacts[0].phone.replace(/[^0-9]/g, "") : "";

      if (firstPhone) {
        window.open(`https://wa.me/${firstPhone}?text=${encodeURIComponent(textToSend)}`, "_blank");
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          sendWA(position.coords.latitude, position.coords.longitude);
        },
        () => {
          sendWA(-6.2088, 106.8456);
        }
      );
    } else {
      sendWA(-6.2088, 106.8456);
    }
  };

  const handleFinishSending = () => {
    setContacts((prev) =>
      prev.map((c) => ({ ...c, status: "Notified" }))
    );
    setStep("shared");
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    completeSOS(step === "sending" ? "canceled" : "successful");
  };

  const calculateDuration = () => {
    if (!sosStartTime) return "0 minutes";
    const diff = Math.floor((Date.now() - sosStartTime) / 60000);
    if (diff < 1) return "Less than a minute";
    return `${diff} minute${diff > 1 ? 's' : ''}`;
  };

  return (
    <main className="-mt-6 min-h-screen w-full bg-[#fffbfb] flex justify-center items-start">
      <div className="w-full max-w-md md:max-w-5xl flex flex-col gap-6">
        
        {/* SCREEN 1 */}
        {(step === "idle" || step === "holding") && (
          <EmergencySheet
            onBack={() => router.back()}
            startHold={startHold}
            cancelHold={cancelHold}
            holdProgress={holdProgress}
            isHolding={step === "holding"}
            shareLiveLocation={shareLiveLocation}
            setShareLiveLocation={setShareLiveLocation}
            contacts={contacts}
            toggleContact={toggleContact}
            isAddingContact={isAddingContact}
            setIsAddingContact={setIsAddingContact}
            newContact={newContact}
            setNewContact={setNewContact}
            handleSaveNewContact={handleSaveNewContact}
            emergencyNote={emergencyNote}
            setEmergencyNote={setEmergencyNote}
            messageInputRef={messageInputRef}
          />
        )}

        {/* SCREEN 2 */}
        {step === "sending" && (
          <SendingSheet
            isPaused={showCancelModal}
            onCancel={() => setShowCancelModal(true)}
            onCountdownEnd={() => {
              handleOpenWhatsApp();
              setStep("shared");
            }}
          />
        )}

        {/* SCREEN 3 */}
        {step === "shared" && (
          <SentSheet
            onBack={() => router.back()}
            shareLiveLocation={shareLiveLocation}
            contacts={contacts}
            nearbyPlaces={nearbyPlaces}
            onIAmSafe={() => setShowCancelModal(true)}
          />
        )}

        {/* SCREEN 4 */}
        {step === "completed" && (
          <EndedSheet
            duration={calculateDuration()}
            primaryContactName={contacts.find(c => c.selected)?.name || contacts[0]?.name}
            status={sosStatus}
            onBackHome={() => {
              setStep("idle");
              router.push("/");
            }}
          />
        )}

      </div>

      {/* CONFIRMATION MODAL */}
      {showCancelModal && (
        <ConfirmSafeModal
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleConfirmCancel}
        />
      )}
    </main>
  );
}