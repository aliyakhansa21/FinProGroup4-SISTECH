"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSOS } from "@/components/sos/hooks/useSOS";
import SOSButton from "@/components/sos/ui/SOSButton";
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

  useEffect(() => {
    const initial = getStoredContacts(DEFAULT_CONTACTS);
    setContacts(initial);
  }, []);

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

  const nearbyPlaces = [
    { id: "p1", name: "Police Station", distance: "300 m", icon: "🚓", lat: -6.2088, lng: 106.8456 },
    { id: "p2", name: "Hospital", distance: "450 m", icon: "🏥", lat: -6.2095, lng: 106.8462 },
    { id: "p3", name: "24 Hour Store", distance: "120 m", icon: "🏪", lat: -6.2081, lng: 106.8449 },
  ];

  // Control Sirine Audio
  useEffect(() => {
    if (step === "sending" || step === "shared") {
      playSirenSound();
    } else {
      stopSirenSound();
    }
    return () => stopSirenSound();
  }, [step]);

  // Reset state ini kalau SOS di-cancel / di-reset
  useEffect(() => {
    if (step === "idle") {
      setIsWaClicked(false);
    }
  }, [step]);

  // JIKA SHARE LOCATION UNCHECKED -> BYPASS LANGSUNG KE SCREEN 3
  useEffect(() => {
    if (step === "sending" && !shareLiveLocation) {
      setStep("shared");
    }
  }, [step, shareLiveLocation, setStep]);

  // FUNGSI BUKA WHATSAPP DENGAN IZIN LOKASI ASLI
  const handleOpenWhatsApp = () => {
    setIsWaClicked(true); // <--- Tandai bahwa WA sudah diklik!

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
          sendWA(-6.2088, 106.8456); // Fallback lokasi jika izin ditolak
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

        {/* SCREEN 1: IDLE / HOLDING */}
        {(step === "idle" || step === "holding") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm h-full">
              <SOSButton
                onStartHold={startHold}
                onCancelHold={cancelHold}
                progress={holdProgress}
                isHolding={step === "holding"}
              />
              <h2 className="text-base md:text-lg font-bold text-gray-900 mt-2">
                Tap and hold to send SOS
              </h2>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                Alerts your trusted circle & activates local siren.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-gray-900">Trusted contacts</h3>
                  <button
                    type="button"
                    onClick={() => setIsAddingContact(!isAddingContact)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-700 hover:bg-amber-200 transition"
                  >
                    {isAddingContact ? "✕" : "✏️"}
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-pink-50/60 p-3">
                  <span className="text-xs font-medium text-gray-700 leading-snug">
                    Share Emergency Location to Trusted Contacts?
                  </span>
                  <input
                    type="checkbox"
                    checked={shareLiveLocation}
                    onChange={(e) => setShareLiveLocation(e.target.checked)}
                    className="h-5 w-5 accent-pink-500 cursor-pointer ml-2"
                  />
                </div>

                <div className={`flex flex-col gap-2 max-h-60 overflow-y-auto pr-1 transition-opacity ${!shareLiveLocation ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => toggleContact(contact.id)}
                      className="flex cursor-pointer items-center justify-between rounded-2xl bg-gray-50 p-3 transition hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-500/20 text-xs font-bold text-lavender-500">
                          {contact.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-800">{contact.name}</p>
                          <p className="text-xxs text-gray-400">{contact.phone}</p>
                        </div>
                      </div>
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${contact.selected ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}>
                        {contact.selected && <span className="text-white text-xxs">✓</span>}
                      </div>
                    </div>
                  ))}

                  {isAddingContact && (
                    <div className="mt-2 flex flex-col gap-3 rounded-2xl border border-pink-100 bg-pink-50/50 p-4">
                      <input
                        type="text"
                        placeholder="Nama Kontak (mis: Ibu)"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-pink-500 bg-white"
                      />
                      <input
                        type="tel"
                        placeholder="Nomor Telepon (mis: +628...)"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-pink-500 bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleSaveNewContact}
                        disabled={!newContact.name || !newContact.phone}
                        className="w-full rounded-xl bg-pink-500 py-2.5 text-xs font-bold text-white transition hover:bg-pink-600 disabled:bg-pink-300"
                      >
                        Simpan Kontak
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-pink-500">📍</span>
                    <h3 className="text-sm font-bold text-gray-900">Emergency message preview</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => messageInputRef.current?.focus()}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-700 hover:bg-amber-200 transition"
                  >
                    ✏️
                  </button>
                </div>

                <textarea
                  ref={messageInputRef}
                  rows={3}
                  value={emergencyNote}
                  onChange={(e) => setEmergencyNote(e.target.value)}
                  placeholder="Hi, ini darurat! Saya mengaktifkan SOS dan mungkin butuh bantuan."
                  className="w-full resize-none rounded-2xl bg-pink-50/50 p-3 text-xs italic text-pink-900 leading-relaxed outline-none border border-transparent transition focus:border-pink-300 focus:bg-white"
                />
              </div>

            </div>
          </div>
        )}

        {/* SCREEN 2: SENDING EMERGENCY SOS */}
        {step === "sending" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm h-full gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 text-4xl animate-ping">
                🚨
              </div>

              <h2 className="text-base md:text-lg font-bold text-gray-900">
                Sending Emergency Alert...
              </h2>
              <p className="text-xs text-gray-400 max-w-xs">
                Local siren is sounding. Send location to WhatsApp contact below.
              </p>

              {/* 1. TOMBOL OPEN WHATSAPP */}
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full max-w-xs rounded-2xl bg-green-500 py-3 text-xs font-bold text-white transition hover:bg-green-600 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>💬</span> Open WhatsApp & Send GPS
              </button>

              {/* 2. TOMBOL CONTINUE (Hanya Aktif Jika WA Sudah Diklik) */}
              <button
                type="button"
                disabled={!isWaClicked}
                onClick={handleFinishSending}
                className={`w-full max-w-xs rounded-2xl py-3 text-xs font-bold text-white transition shadow-sm ${
                  isWaClicked
                    ? "bg-pink-500 hover:bg-pink-600 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed opacity-60"
                }`}
              >
                {isWaClicked ? "Already Sent? Continue →" : "Click WhatsApp Button First ⬆️"}
              </button>

              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="w-full max-w-xs rounded-2xl border border-pink-300 py-2 text-xs font-bold text-pink-600 transition hover:bg-pink-50"
              >
                Cancel SOS
              </button>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-bold text-gray-900 border-b border-dashed border-gray-100 pb-3">
                Trusted contacts status
              </h3>

              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                {contacts.filter((c) => c.selected).map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between rounded-2xl bg-gray-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender-500/20 text-xs font-bold text-lavender-500">
                        {contact.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{contact.name}</p>
                        <p className="text-xxs text-gray-400">{contact.phone}</p>
                      </div>
                    </div>

                    <span className={`rounded-full px-3 py-1 text-xxs font-bold ${contact.status === "Notified" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700 animate-pulse"}`}>
                      {contact.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SCREEN 3: EMERGENCY SOS SENT */}
        {step === "shared" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center text-center bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-500 text-3xl mb-3">
                  🚨
                </div>
                {shareLiveLocation ? (
                  <>
                    <h2 className="text-base font-bold text-gray-900 max-w-xs">
                      Your trusted contacts have been notified.
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs">
                      Siren is active and emergency location has been transmitted.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-base font-bold text-gray-900 max-w-xs">
                      Local Siren Active 🚨
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs">
                      Emergency mode is running locally to attract attention.
                    </p>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="w-full rounded-2xl border-2 border-pink-500 bg-white py-3.5 text-xs font-bold text-pink-600 transition hover:bg-pink-50 shadow-sm"
              >
                I'm safe now
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-gray-900">Trusted contacts</h3>
                </div>

                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between rounded-2xl bg-gray-50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-500/20 text-xs font-bold text-lavender-500">
                          {contact.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-800">{contact.name}</p>
                          <p className="text-xxs text-gray-400">{contact.phone}</p>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600 transition hover:bg-green-200 text-sm"
                        title="Call via WhatsApp"
                      >
                        💬
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-3">
                <h3 className="text-sm font-bold text-gray-900 border-b border-dashed border-gray-100 pb-3">
                  Nearby Safe Places
                </h3>

                <div className="flex flex-col gap-2">
                  {nearbyPlaces.map((place) => (
                    <div
                      key={place.id}
                      className="flex items-center justify-between rounded-2xl bg-gray-50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{place.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-gray-800">{place.name}</p>
                          <p className="text-xxs text-gray-400">{place.distance}</p>
                        </div>
                      </div>

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition hover:bg-pink-200 text-xs"
                        title="Route in Google Maps"
                      >
                        📍
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* SCREEN 4: EMERGENCY ENDED */}
        {step === "completed" && (
          <div className="flex flex-col items-center justify-center max-w-lg mx-auto w-full gap-6 py-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-pink-100/70 text-5xl mb-4 animate-bounce">
                ☁️
              </div>
              <h2 className="text-xl md:text-2xl font-black text-gray-900">
                Glad you're safe! 💗
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-xs leading-relaxed">
                Local siren has been turned off and emergency mode ended.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full rounded-2xl bg-pink-500 py-3.5 text-xs md:text-sm font-bold text-white transition hover:bg-pink-600 shadow-sm"
            >
              Back to Home
            </button>
          </div>
        )}

      </div>

      {/* SAFETY CONFIRMATION MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl flex flex-col items-center text-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-2xl text-pink-600">
              ❓
            </div>
            <h3 className="text-base font-bold text-gray-900">Are you sure?</h3>
            <p className="text-xs text-gray-500 max-w-xs">
              Ending Emergency Mode will stop the siren and local alert.
            </p>
            <div className="flex w-full gap-3 mt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="w-1/2 rounded-2xl border border-pink-300 py-3 text-xs font-bold text-pink-600 hover:bg-pink-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="w-1/2 rounded-2xl bg-pink-500 py-3 text-xs font-bold text-white hover:bg-pink-600"
              >
                Yes, I'm Safe
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}