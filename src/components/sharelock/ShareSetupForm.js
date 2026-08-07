"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { X, Map as MapIcon, ChevronRight, UserPlus, Battery, BellRing, Phone, Delete } from "lucide-react";
import PinDigitInputs from "./PinDigitInputs";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const HeatmapView = dynamic(() => import("@/components/heatmap/HeatmapView"), { ssr: false });

// ── Custom Numeric Keypad for PIN entry (no soft keyboard) ──────────────────
function PinKeypad({ title, subtitle, digits, onKeyPress, onDelete, onBack, error }) {
  return (
    <div className="flex flex-col items-center px-6 pt-6 pb-8 w-full">
      {/* Back */}
      {onBack && (
        <button
          onClick={onBack}
          className="self-start mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Back
        </button>
      )}

      {/* Icon */}
      <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-5 rotate-3">
        <BellRing className="w-8 h-8 text-[#E4537D]" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">{title}</h3>
      <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">{subtitle}</p>

      {/* PIN dots */}
      <div className="flex items-center justify-center gap-4 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
              i < digits.length
                ? "bg-[#E4537D] scale-110"
                : "border-2 border-[#F5B8CB] bg-transparent"
            }`}
          />
        ))}
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 font-medium text-center mb-4">{error}</p>
      )}

      {/* Keypad */}
      <div className="w-full max-w-[280px] mx-auto mt-2">
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => onKeyPress(num)}
              disabled={digits.length >= 4}
              className="aspect-square rounded-full border-2 border-[#F5B8CB] text-gray-900 text-2xl font-semibold flex items-center justify-center hover:bg-[#FDF1F4] active:bg-[#FDE3EA] active:scale-95 transition-all disabled:opacity-40"
            >
              {num}
            </button>
          ))}
          {/* Empty */}
          <div />
          {/* 0 */}
          <button
            onClick={() => onKeyPress(0)}
            disabled={digits.length >= 4}
            className="aspect-square rounded-full border-2 border-[#F5B8CB] text-gray-900 text-2xl font-semibold flex items-center justify-center hover:bg-[#FDF1F4] active:bg-[#FDE3EA] active:scale-95 transition-all disabled:opacity-40"
          >
            0
          </button>
          {/* Backspace */}
          <button
            onClick={onDelete}
            className="aspect-square rounded-full border-2 border-gray-300 bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 active:scale-95 transition-all"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function ShareSetupForm({ onStart }) {
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [showPinModal, setShowPinModal] = useState(false);
  const [contacts] = useLocalStorage("sos_trusted_contacts", [
      { id: "1", name: "Mom", phone: "+628111111111", avatar: "M" },
      { id: "2", name: "Dad", phone: "+628222222222", avatar: "D" }
  ]);

  // PIN flow: "set" → "confirm"
  const [pinStep, setPinStep] = useState("set"); // "set" | "confirm"
  const [pinDigits, setPinDigits] = useState([]);
  const [confirmDigits, setConfirmDigits] = useState([]);
  const [formError, setFormError] = useState(null);

  const durations = [
    { label: "30 Min", value: 30 },
    { label: "1 Hour", value: 60 },
    { label: "Until I Arrive", value: 120 },
  ];

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleOpenModal = () => {
    setShowPinModal(true);
    setPinStep("set");
    setPinDigits([]);
    setConfirmDigits([]);
    setFormError(null);
  };

  const handleCloseModal = () => {
    setShowPinModal(false);
    setPinStep("set");
    setPinDigits([]);
    setConfirmDigits([]);
    setFormError(null);
  };

  // SET step: auto-advance when 4 digits entered
  const handleSetKeyPress = (num) => {
    if (pinDigits.length >= 4) return;
    const next = [...pinDigits, num.toString()];
    setPinDigits(next);
    if (next.length === 4) {
      // short delay so user sees 4th dot fill before advancing
      setTimeout(() => {
        setPinStep("confirm");
        setFormError(null);
      }, 200);
    }
  };

  const handleSetDelete = () => {
    setPinDigits((p) => p.slice(0, -1));
    setFormError(null);
  };

  // CONFIRM step: auto-validate when 4 digits entered
  const handleConfirmKeyPress = (num) => {
    if (confirmDigits.length >= 4) return;
    const next = [...confirmDigits, num.toString()];
    setConfirmDigits(next);
    if (next.length === 4) {
      setTimeout(() => {
        if (next.join("") === pinDigits.join("")) {
          handleCloseModal();
          onStart({ durationMinutes: selectedDuration, pin: pinDigits.join("") });
        } else {
          setFormError("PINs do not match. Try again.");
          setConfirmDigits([]);
        }
      }, 200);
    }
  };

  const handleConfirmDelete = () => {
    setConfirmDigits((p) => p.slice(0, -1));
    setFormError(null);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full pb-28 md:pb-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-6 pt-4 md:pt-6">

        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Share Location</h1>
          <p className="text-gray-500 mt-1">See your circle. Let them see you.</p>
        </div>

        {/* ── HERO CARD ─────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#F57FA0] via-[#F06D93] to-[#DC4C79] rounded-3xl p-6 md:p-10 shadow-lg text-white">
          {/* Cloud mascot — absolute, constrained width so it never overlaps text */}
          <div className="absolute top-4 right-3 sm:top-5 sm:right-5 z-0">
            <div className="w-[68px] h-[68px] sm:w-20 sm:h-20 relative opacity-90">
              <Image
                src="/sharelock/cloud-mascot.png"
                alt="mascot"
                fill
                sizes="(max-width: 640px) 68px, 80px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Text — padded right to avoid mascot overlap */}
          <div className="relative z-10 pr-20 sm:pr-24">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-2 leading-tight drop-shadow-sm">
              You&apos;re not sharing your location
            </h2>
            <p className="text-white/90 text-xs sm:text-sm mb-5 font-medium leading-relaxed drop-shadow-sm">
              Turn it on so your trusted circle can check on you in real time
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {durations.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDuration(d.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    selectedDuration === d.value
                      ? "bg-white text-[#E4537D] shadow-md ring-2 ring-white/50"
                      : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleOpenModal}
              className="w-full bg-white text-[#E4537D] py-3.5 px-8 rounded-full font-bold shadow-[0_8px_16px_rgba(228,83,125,0.3)] hover:shadow-[0_12px_24px_rgba(228,83,125,0.4)] transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Sharing My Location
            </button>
          </div>
        </div>

        {/* ── MAP PREVIEW CARD ──────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">3 people sharing nearby</span>
            </div>
            <button className="flex items-center space-x-1.5 text-[#E4537D] text-sm font-bold hover:bg-pink-50 px-3 py-1.5 rounded-full transition-colors">
              <MapIcon className="w-4 h-4" />
              <span>Open Map</span>
            </button>
          </div>

          {/* Map — seamless (no inner border/rounding) */}
          <div className="h-48 md:h-64 w-full relative bg-gray-50">
            <div className="absolute inset-0">
              <HeatmapView activeFilter="All" isBackground={true} />
            </div>
            {/* Avatar overlays */}
            <div className="absolute top-1/4 left-1/4 z-10 w-10 h-10 rounded-full bg-[#ED6690] text-white border-2 border-white shadow-md flex items-center justify-center font-bold text-xs">MR</div>
            <div className="absolute top-1/2 right-1/3 z-10 w-10 h-10 rounded-full bg-purple-500 text-white border-2 border-white shadow-md flex items-center justify-center font-bold text-xs">D</div>
            <div className="absolute bottom-1/4 left-1/3 z-10 w-10 h-10 rounded-full bg-green-500 text-white border-2 border-white shadow-md flex items-center justify-center font-bold text-xs">JR</div>
            {/* Fade gradient */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ── TRUSTED CIRCLE ────────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-gray-900">Trusted Circle</h3>
            <button className="text-[#E4537D] text-sm font-bold">Manage</button>
          </div>

          <div className="space-y-4">
            {contacts.length === 0 && (
              <p className="text-sm text-gray-500 italic">No trusted contacts added yet.</p>
            )}
            {contacts.map((contact, idx) => (
              <div key={contact.id || idx}>
                <div className="flex items-center justify-between p-3 -mx-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center text-[#ED6690] font-bold text-sm uppercase">
                      {contact.avatar || contact.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{contact.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-1 text-gray-500 text-[11px]">
                      <Battery className="w-3 h-3 text-gray-400" />
                      <span>{Math.floor(Math.random() * 40 + 60)}%</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                  </div>
                </div>
                {idx < contacts.length - 1 && <div className="h-px bg-gray-100 ml-14" />}
              </div>
            ))}
          </div>
        </div>

        {/* ── ADD TO CIRCLE ─────────────────────────────────────────────── */}
        <button className="w-full bg-pink-50/50 hover:bg-pink-50 border border-pink-100 border-dashed rounded-3xl p-6 transition-colors group flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-pink-100 text-[#E4537D] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <UserPlus className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-gray-900 mb-1">Add someone to your circle</h4>
          <p className="text-sm text-gray-500">They&apos;ll be able to see when you share</p>
        </button>
      </div>

      {/* ── PIN MODAL (full-screen, above bottom nav) ─────────────────── */}
      {showPinModal && (
        <div className="fixed inset-0 z-[1100] bg-[#FFF7F8] flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
            <h2 className="text-lg font-bold text-gray-900">Set a safety PIN</h2>
            <button
              onClick={handleCloseModal}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 pt-4 shrink-0">
            <div className={`h-1.5 w-10 rounded-full transition-all ${pinStep === "set" ? "bg-[#E4537D]" : "bg-[#E4537D]"}`} />
            <div className={`h-1.5 w-10 rounded-full transition-all ${pinStep === "confirm" ? "bg-[#E4537D]" : "bg-gray-200"}`} />
          </div>

          {/* Keypad step */}
          {pinStep === "set" ? (
            <PinKeypad
              title="Enter a 4-digit PIN"
              subtitle="You'll need this PIN to confirm you're safe when it's time to check in."
              digits={pinDigits}
              onKeyPress={handleSetKeyPress}
              onDelete={handleSetDelete}
              error={null}
            />
          ) : (
            <PinKeypad
              title="Confirm your PIN"
              subtitle="Enter the same PIN again to confirm."
              digits={confirmDigits}
              onKeyPress={handleConfirmKeyPress}
              onDelete={handleConfirmDelete}
              onBack={() => { setPinStep("set"); setConfirmDigits([]); setFormError(null); }}
              error={formError}
            />
          )}
        </div>
      )}
    </div>
  );
}