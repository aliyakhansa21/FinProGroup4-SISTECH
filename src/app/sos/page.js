"use client";

import { useState, useEffect, useRef } from "react";
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
  { id: "2", name: "Dad", phone: "+6281298765432", avatar: "D", selected: true, status: "Sending..." },
  { id: "3", name: "Maya R.", phone: "+6281311223344", avatar: "MR", selected: true, status: "Sending..." },
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
  } = useSOS();

  const [shareLiveLocation, setShareLiveLocation] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isWaClicked, setIsWaClicked] = useState(false);

  // Form Tambah Kontak
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  const messageInputRef = useRef(null);
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS);

  // Nearby Safe Places Data
  const nearbyPlaces = [
    { id: "p1", name: "Police Station", distance: "300 m", icon: "🚓", lat: -6.2088, lng: 106.8456 },
    { id: "p2", name: "Hospital", distance: "450 m", icon: "🏥", lat: -6.2095, lng: 106.8462 },
    { id: "p3", name: "24 Hour Store", distance: "120 m", icon: "🏪", lat: -6.2081, lng: 106.8449 },
  ];

  useEffect(() => {
    const initial = getStoredContacts(DEFAULT_CONTACTS);
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
      c.id === id ? { ...c, selected: !c.selected } : c
    );
    updateContactsState(updated);
  };

  const handleSaveNewContact = () => {
    if (newContact.name.trim() && newContact.phone.trim()) {
      const updated = [
        ...contacts,
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
    if (step === "sending" || step === "shared") {
      playSirenSound();
    } else {
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
      const defaultMsg = "Hi, ini darurat! Saya mengaktifkan SOS dan mungkin butuh bantuan.";
      const textToSend = `${emergencyNote || defaultMsg}\n\n📍 GPS Location:\n${mapsUrl}`;

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
    completeSOS();
  };

  return (
    <main className="min-h-screen w-full bg-gray-50 p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-md md:max-w-5xl flex flex-col gap-6">
        
        {/* Header Navigation */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition hover:bg-pink-200"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-lg md:text-xl font-bold text-gray-900">Emergency SOS</h1>
        </div>

        {/* SCREEN 1 */}
        {(step === "idle" || step === "holding") && (
          <EmergencySheet
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
            contacts={contacts}
            isWaClicked={isWaClicked}
            handleOpenWhatsApp={handleOpenWhatsApp}
            handleFinishSending={handleFinishSending}
            onCancel={() => setShowCancelModal(true)}
          />
        )}

        {/* SCREEN 3 */}
        {step === "shared" && (
          <SentSheet
            shareLiveLocation={shareLiveLocation}
            contacts={contacts}
            nearbyPlaces={nearbyPlaces}
            onIAmSafe={() => setShowCancelModal(true)}
          />
        )}

        {/* SCREEN 4 */}
        {step === "completed" && <EndedSheet />}

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