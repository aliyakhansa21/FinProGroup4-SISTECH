"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { playSirenSound, stopSirenSound } from "@/lib/sirenAudio";
import SafetyConfirmation from "../modals/ConfirmSafeModal";

export default function SentSheet({
  onBack,
  contacts,
  nearbyPlaces = [
    { name: "Police Station", distance: "300 m" },
    { name: "Hospital", distance: "450 m" },
    { name: "24 Hour Store", distance: "120 m" }
  ],
  onIAmSafe,
  emergencyMessage,
  userLocation = { lat: -6.2088, lng: 106.8456 },
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  const primaryContact = contacts?.find(c => c.selected) || contacts?.[0] || { name: "Dad", phone: "+1 (555) 030-4040", avatar: "D" };

  useEffect(() => {
    if (isMuted) {
      stopSirenSound();
    } else {
      playSirenSound();
    }
  }, [isMuted]);

  // Clean up siren if unmounted
  useEffect(() => {
    return () => stopSirenSound();
  }, []);

  const handleCopyLink = () => {
    const lat = -6.2088; 
    const lng = 106.8456;
    const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
    navigator.clipboard.writeText(`Hi, this is my emergency location: ${mapsUrl}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const lat = -6.2088; 
    const lng = 106.8456;
    const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
    const defaultMsg = `Hi ${primaryContact.name}, I may need help. Please check on me when you can.`;
    const textToSend = `${emergencyMessage || defaultMsg}\n\n📍 GPS Location:\n${mapsUrl}`;
    const waUrl = `https://wa.me/${primaryContact.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(textToSend)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="flex flex-col w-full min-h-[100vh] bg-[#fffbfb] relative pb-32">
      
      <style>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-3deg); }
          20% { transform: translate(-2px, 0px) rotate(3deg); }
          30% { transform: translate(2px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(3deg); }
          50% { transform: translate(-1px, 2px) rotate(-3deg); }
          60% { transform: translate(-2px, 1px) rotate(0deg); }
          70% { transform: translate(2px, 1px) rotate(-3deg); }
          80% { transform: translate(-1px, -1px) rotate(3deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-3deg); }
        }
        .animate-shake {
          animation: shake 0.5s infinite;
        }
      `}</style>

      {/* Top Header Card */}
      <div className="w-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] md:shadow-sm md:border-x md:border-b md:border-t-0 md:border-gray-100 rounded-b-[20px] md:rounded-b-3xl md:rounded-t-none flex flex-col items-center justify-center px-5 pt-8 pb-10 md:py-12 gap-6 relative z-10 font-['Plus_Jakarta_Sans']">
        
        <div className="flex items-center gap-3 w-full justify-start mb-2">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-[#fde9f1] text-pink-600 transition hover:bg-pink-200 p-[5px]"
            aria-label="Back"
          >
            <Image src="/back-button.svg" alt="Back" width={28} height={28} className="w-full h-full object-contain" />
          </button>
          <h1 className="text-[18px] md:text-xl font-bold text-[#27272a] leading-[28px]">Emergency SOS</h1>
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <Image 
            src="/sos/sosIcon.svg" 
            alt="Emergency Active" 
            width={100} 
            height={100} 
            className="object-contain animate-shake"
            style={{ filter: "invert(27%) sepia(91%) saturate(7483%) hue-rotate(355deg) brightness(97%) contrast(116%)" }}
          />
          <h2 className="text-[18px] md:text-xl font-bold text-[#27272a] leading-[28px] max-w-[322px] mt-2">
            Emergency Mode Active
          </h2>
          <p className="text-[12px] text-[#9b8aa3] leading-[16px] whitespace-pre-wrap">
            Stay calm.<br />We're here with you.
          </p>
        </div>
      </div>

      {/* Main Content Area (Cards) */}
      <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto px-5 pt-6 pb-20 font-['Plus_Jakarta_Sans']">
        
        {/* Card 1: Siren Sound */}
        <div className="w-full rounded-[22px] bg-white border border-[rgba(120,80,120,0.1)] p-4 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between w-full">
            <span className="text-[16px] font-bold text-[#3a2a3f] leading-[24px]">Siren Sound</span>
            <span className={`text-[14px] font-bold leading-[20px] ${isMuted ? 'text-gray-400' : 'text-[#ee537f]'}`}>
              {isMuted ? "OFF" : "ON"}
            </span>
          </div>
          <div className="w-full h-[1px] border-t border-dashed border-[#e4e4e7]"></div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-full h-[49px] rounded-[30px] bg-white border-2 border-[#a1a1aa] flex items-center justify-center gap-2 transition hover:bg-gray-50"
          >
            <span className="text-[16px] font-bold text-[#71717a] leading-[24px]">
              {isMuted ? "Unmute Siren" : "Mute Siren"}
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMuted ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Card 2: Current Location */}
        <div className="w-full rounded-[22px] bg-white border border-[rgba(120,80,120,0.1)] p-4 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between w-full">
            <span className="text-[16px] font-bold text-[#3a2a3f] leading-[24px]">Current Location</span>
            <span className="text-[12px] text-[#a1a1aa] leading-[16px]">Last updated just now</span>
          </div>
          <div className="w-full h-[1px] border-t border-dashed border-[#e4e4e7]"></div>
          <div className="w-full rounded-[16px] bg-[#fdf5fc] flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <Image src="/location.svg" alt="Location" width={18} height={18} />
              <span className="text-[12px] font-medium text-[#71717a] leading-[16px] underline truncate max-w-[150px]">
                https://maps.google.com/?q=-6.2088,106.8456
              </span>
            </div>
            <button onClick={handleCopyLink} className="transition hover:opacity-70 text-pink-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Card 3: Primary Contact */}
        <div className="w-full rounded-[22px] bg-white border border-[rgba(120,80,120,0.1)] p-4 flex flex-col gap-3 shadow-sm">
          <div className="flex flex-col gap-1 w-full text-left">
            <span className="text-[16px] font-bold text-[#3a2a3f] leading-[24px]">Primary Contact</span>
            <span className="text-[12px] text-[#a1a1aa] leading-[16px]">
              We'll open WhatsApp with your emergency message and location ready to send.
            </span>
          </div>
          <div className="w-full h-[1px] border-t border-dashed border-[#e4e4e7]"></div>
          
          <div className="w-full rounded-[16px] bg-[#fafafa] flex items-center p-[10px] gap-3">
            <div className="h-9 w-9 rounded-full bg-[#e0d0f9] flex items-center justify-center border-[1.1px] border-[#e0d0f9] shrink-0">
              <span className="text-[16px] font-bold text-[#4a3b7a]">
                {primaryContact.avatar || primaryContact.name.charAt(0)}
              </span>
            </div>
            <div className="flex flex-col w-full text-left">
              <span className="text-[14px] font-semibold text-[#3a2a3f] leading-[20px]">{primaryContact.name}</span>
              <span className="text-[12px] text-[#a1a1aa] leading-[16px]">{primaryContact.phone}</span>
            </div>
          </div>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full h-[47px] rounded-[30px] bg-[#00c950] flex items-center justify-center gap-2 transition hover:bg-green-600 shadow-sm mt-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12.031 0C5.385 0 0 5.384 0 12.031c0 2.12.551 4.185 1.597 6.002L.012 24l6.115-1.603A11.956 11.956 0 0 0 12.03 24c6.647 0 12.03-5.384 12.03-12.03C24.06 5.385 18.677 0 12.031 0zm6.541 17.262c-.27.765-1.572 1.417-2.17 1.488-.539.064-1.229.182-3.953-.949-3.284-1.365-5.412-4.734-5.58-4.96-.166-.226-1.332-1.776-1.332-3.393 0-1.616.84-2.42 1.144-2.735.304-.315.663-.394.884-.394.22 0 .441 0 .633.009.204.01.48-.078.751.578.286.69 1.002 2.451 1.091 2.632.09.18.15.39.037.601-.11.21-.165.344-.33.525-.166.18-.344.405-.497.555-.165.166-.338.345-.143.682.193.338.86 1.428 1.844 2.308 1.272 1.139 2.327 1.493 2.671 1.659.345.165.545.135.75-.09.205-.226.883-1.02 1.117-1.37.234-.345.47-.285.787-.165.317.12 1.996.945 2.34 1.11.344.165.57.247.653.382.083.136.083.788-.187 1.553z"></path>
            </svg>
            <span className="text-[16px] font-bold text-white leading-[24px]">Continue to WhatsApp</span>
          </button>
        </div>

        {/* Card 4: Get to a safer place */}
        <div className="w-full rounded-[22px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-5 flex flex-col gap-4">
          <span className="text-[16px] font-bold text-[#27272a] leading-[24px] text-left">
            Get to a safer place
          </span>
          <div className="w-full h-[1px] border-t border-dashed border-[#e4e4e7]"></div>
          
          <div className="flex flex-col gap-3 w-full">
            {nearbyPlaces.map((place, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  if (place.lat && place.lng) {
                    const navUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${place.lat},${place.lng}&travelmode=walking`;
                    window.open(navUrl, "_blank");
                  }
                }}
                className="w-full rounded-[16px] bg-[#fafafa] flex items-center justify-between p-[10px] hover:bg-[#f4f4f5] transition cursor-pointer"
              >
                <div className="flex flex-col text-left">
                  <span className="text-[14px] font-semibold text-[#3a2a3f] leading-[20px]">{place.name}</span>
                  <span className="text-[12px] text-[#a1a1aa] leading-[16px]">{place.distance}</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#ffe0d3] flex items-center justify-center shrink-0">
                  <Image src="/sos/Navigate Icon.svg" alt="Navigate" width={16} height={16} />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Navigation - "I'm safe now" */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-5xl bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)] rounded-t-[28px] border-t border-[#e4e4e7] flex flex-col items-center justify-center p-4 pb-6 z-50">
        <button
          type="button"
          onClick={onIAmSafe}
          className="w-full max-w-sm rounded-[30px] border-2 border-[#f57fa0] bg-white h-[57px] text-[16px] font-bold text-[#f57fa0] flex items-center justify-center transition hover:bg-pink-50"
        >
          <span className="leading-[24px]">I'm safe now</span>
        </button>
      </div>

    </div>
  );
}