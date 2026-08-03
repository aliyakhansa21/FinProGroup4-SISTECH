"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSOS } from "@/components/sos/hooks/useSOS";
import SOSButton from "@/components/sos/ui/SOSButton";

export default function SOSPage() {
  const router = useRouter();
  const {
    step,
    holdProgress,
    session,
    emergencyNote,
    setEmergencyNote,
    startHold,
    cancelHold,
    completeSOS,
  } = useSOS();

  // State Screen 1
  const [shareLiveLocation, setShareLiveLocation] = useState(true);
  const [isEditingNote, setIsEditingNote] = useState(false);

  // State Modal Safety Confirmation
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Mock Contacts
  const [contacts, setContacts] = useState([
    { id: "1", name: "Jesse R.", phone: "+1 (555) 050-6060", avatar: "JR", selected: true, status: "Notified" },
    { id: "2", name: "Dad", phone: "+1 (555) 030-4040", avatar: "D", selected: true, status: "Notified" },
    { id: "3", name: "Maya R.", phone: "+1 (555) 010-2020", avatar: "MR", selected: true, status: "Notified" },
  ]);

  // Mock Nearby Safe Places
  const nearbyPlaces = [
    { id: "p1", name: "Police Station", distance: "300 m", icon: "🚓" },
    { id: "p2", name: "Hospital", distance: "450 m", icon: "🏥" },
    { id: "p3", name: "24 Hour Store", distance: "120 m", icon: "🏪" },
  ];

  const toggleContact = (id) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  // Countdown timer untuk Screen 2 (5 detik sebelum otomatis berpindah ke Screen 3 / shared)
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    let timer;
    if (step === "sending" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Timer Durasi Berbagi Lokasi untuk Screen 3
  const [secondsActive, setSecondsActive] = useState(5456); // 1 jam 30 menit 56 detik contoh
  useEffect(() => {
    let interval;
    if (step === "shared") {
      interval = setInterval(() => {
        setSecondsActive((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
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

        {/* ==================== SCREEN 1: IDLE / HOLDING ==================== */}
        {(step === "idle" || step === "holding") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* KOLOM KIRI (Desktop): Hero Section Tombol SOS */}
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
                Alerts your trusted circle & shares live location.
              </p>
            </div>

            {/* KOLOM KANAN (Desktop): Settings Cards */}
            <div className="flex flex-col gap-5">
              
              {/* Card 1: Trusted Contacts */}
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-gray-900">Trusted contacts</h3>
                  <button type="button" className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-700">
                    ✏️
                  </button>
                </div>

                {/* Toggle Share Live Location */}
                <div className="flex items-center justify-between rounded-2xl bg-pink-50/60 p-3">
                  <span className="text-xs font-medium text-gray-700 leading-snug">
                    Share Live Location to Trusted Contacts?
                  </span>
                  <input
                    type="checkbox"
                    checked={shareLiveLocation}
                    onChange={(e) => setShareLiveLocation(e.target.checked)}
                    className="h-5 w-5 accent-pink-500 cursor-pointer ml-2"
                  />
                </div>

                {/* Contact List */}
                <div className="flex flex-col gap-2">
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
                </div>
              </div>

              {/* Card 2: Emergency Message Preview */}
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-pink-500">📍</span>
                    <h3 className="text-sm font-bold text-gray-900">Emergency message preview</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingNote(!isEditingNote)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-700"
                  >
                    ✏️
                  </button>
                </div>

                {isEditingNote ? (
                  <textarea
                    rows={3}
                    value={emergencyNote}
                    onChange={(e) => setEmergencyNote(e.target.value)}
                    placeholder="Edit pesan darurat Anda..."
                    className="w-full rounded-2xl border border-gray-200 p-3 text-xs outline-none focus:border-pink-500"
                  />
                ) : (
                  <div className="rounded-2xl bg-pink-50/50 p-3 text-xs italic text-pink-900 leading-relaxed">
                    "{emergencyNote || "Hi, ini darurat! Saya mengaktifkan SOS dan mungkin butuh bantuan. Pantau lokasi saya di sini."}"
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ==================== SCREEN 2: SENDING EMERGENCY SOS ==================== */}
        {step === "sending" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* KOLOM KIRI (Desktop): Countdown Ring & Cancel Button */}
            <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm h-full gap-4">
              <div className="relative flex items-center justify-center my-2">
                <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-gray-100"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-red-500 transition-all duration-1000 ease-linear"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * countdown) / 5}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-4xl font-black text-red-600">
                  {countdown}
                </span>
              </div>

              <h2 className="text-base md:text-lg font-bold text-gray-900">
                Sending Emergency Alert...
              </h2>

              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="mt-4 w-full max-w-xs rounded-2xl border border-pink-300 py-3 text-xs font-bold text-pink-600 transition hover:bg-pink-50"
              >
                Cancel SOS
              </button>
            </div>

            {/* KOLOM KANAN (Desktop): Status Trusted Contacts */}
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-bold text-gray-900 border-b border-dashed border-gray-100 pb-3">
                Trusted contacts
              </h3>

              <div className="flex flex-col gap-3">
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

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xxs font-bold text-green-700">
                      Notified
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==================== SCREEN 3: EMERGENCY SOS SENT ==================== */}
        {step === "shared" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* KOLOM KIRI (Desktop): Success Hero + Live Duration Timer */}
            <div className="flex flex-col gap-5">
              
              {/* Hero Banner Success */}
              <div className="flex flex-col items-center text-center bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-500 text-3xl mb-3">
                  ✓
                </div>
                <h2 className="text-base font-bold text-gray-900 max-w-xs">
                  Your trusted contacts have been notified.
                </h2>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  We're sharing your live location until you tell us you're safe.
                </p>
              </div>

              {/* Live Location Duration Card */}
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-gray-800">
                    <span className="text-pink-500">📍</span> Sharing live location
                  </div>
                  <span className="text-xxs text-gray-400">Started 8:42 PM</span>
                </div>

                <div className="flex items-center justify-center rounded-2xl bg-pink-50/50 py-4 text-3xl md:text-4xl font-extrabold tracking-widest text-pink-500">
                  {formatTimer(secondsActive)}
                </div>
              </div>

              {/* Action Button: I'm safe now */}
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="w-full rounded-2xl border-2 border-pink-500 bg-white py-3.5 text-xs font-bold text-pink-600 transition hover:bg-pink-50 shadow-sm"
              >
                I'm safe now
              </button>
            </div>

            {/* KOLOM KANAN (Desktop): Call List & Nearby Safe Places */}
            <div className="flex flex-col gap-5">
              
              {/* Trusted Contacts Direct Call List */}
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-gray-900">Trusted contacts</h3>
                  <button type="button" className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-700">
                    ✏️
                  </button>
                </div>

                <div className="flex flex-col gap-2">
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
                        href={`tel:${contact.phone}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition hover:bg-pink-200 text-sm"
                        title="Call Contact"
                      >
                        📞
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Safe Places Card */}
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

                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition hover:bg-pink-200 text-xs"
                      >
                        📍
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================== SCREEN 4: EMERGENCY ENDED ==================== */}
        {step === "completed" && (
          <div className="flex flex-col items-center py-12 text-center max-w-md mx-auto w-full bg-white rounded-3xl border border-gray-100 p-8">
            <span className="text-4xl">💗</span>
            <h2 className="mt-3 text-lg font-bold text-gray-900">Glad you're safe!</h2>
            <p className="text-xs text-gray-500 mt-1">Live location sharing has stopped.</p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-6 w-full rounded-2xl bg-pink-500 py-3 text-xs font-bold text-white"
            >
              Back to Home
            </button>
          </div>
        )}

      </div>

      {/* ==================== SAFETY CONFIRMATION MODAL ==================== */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl flex flex-col items-center text-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-2xl text-pink-600">
              ❓
            </div>
            <h3 className="text-base font-bold text-gray-900">Are you sure?</h3>
            <p className="text-xs text-gray-500 max-w-xs">
              Ending Emergency Mode will stop location sharing.
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