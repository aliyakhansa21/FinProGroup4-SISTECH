"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { X, Map as MapIcon, ChevronRight, UserPlus, Battery, BellRing, Phone } from "lucide-react";
import PinDigitInputs from "./PinDigitInputs";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const HeatmapView = dynamic(() => import("@/components/heatmap/HeatmapView"), { ssr: false });

export default function ShareSetupForm({ onStart }) {
    const [selectedDuration, setSelectedDuration] = useState(30);
    const [showPinModal, setShowPinModal] = useState(false);
    const [pinDigits, setPinDigits] = useState(["", "", "", ""]);
    const [confirmDigits, setConfirmDigits] = useState(["", "", "", ""]);
    const [formError, setFormError] = useState(null);
    const [contacts] = useLocalStorage("sos_trusted_contacts", [
        { id: "1", name: "Mom", phone: "+628111111111", avatar: "M" },
        { id: "2", name: "Dad", phone: "+628222222222", avatar: "D" }
    ]);

    const durations = [
        { label: "1 Min", value: 1},
        { label: "30 Min", value: 30 },
        { label: "1 Hour", value: 60 },
        { label: "Until I Arrive", value: 120 }
    ];

    const handleStartSharingClick = () => {
        setShowPinModal(true);
    };

    const handleConfirmAndStart = () => {
        const pin = pinDigits.join("");
        const confirmPin = confirmDigits.join("");
        
        if (pin.length < 4 || confirmPin.length < 4) {
        setFormError("Please complete all 4 digits for both PIN fields.");
        return;
        }
        
        if (pin !== confirmPin) {
        setFormError("PINs do not match. Please try again.");
        return;
        }
        
        setFormError(null);
        setShowPinModal(false);
        onStart({ durationMinutes: selectedDuration, pin });
    };

    return (
        <div className="w-full pb-28 md:pb-12 font-sans">
            <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-6 pt-4 md:pt-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Share Location</h1>
                    <p className="text-gray-500 mt-1">See your circle. Let them see you.</p>
                </div>

                {/* HERO CARD */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#F57FA0] via-[#F06D93] to-[#DC4C79] rounded-3xl p-6 md:p-10 shadow-lg text-white">
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                        <div className="w-20 h-20 relative">
                            <Image 
                                src="/sharelock/cloud-maskot.png" 
                                alt="mascot" 
                                fill
                                sizes="(max-width: 768px) 100px, 150px"
                                className="object-contain"
                            />
                        </div>
                    </div>
                    
                    <div className="relative z-10 max-w-sm">
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight drop-shadow-sm">
                        You&apos;re not sharing your location
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base mb-6 font-medium leading-relaxed drop-shadow-sm">
                        Turn it on so your trusted circle can check on you in real time
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
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
                        onClick={handleStartSharingClick}
                        className="w-full sm:w-auto bg-white text-[#E4537D] py-3.5 px-8 rounded-full font-bold shadow-[0_8px_16px_rgba(228,83,125,0.3)] hover:shadow-[0_12px_24px_rgba(228,83,125,0.4)] transform hover:-translate-y-1 transition-all duration-200"
                        >
                        Start Sharing My Location
                        </button>
                    </div>
                </div>

                {/* MAP PREVIEW CARD */}
                <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 overflow-hidden relative">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-gray-700">3 people sharing nearby</span>
                        </div>
                        <button className="flex items-center space-x-1 text-[#E4537D] text-sm font-bold hover:bg-pink-50 px-3 py-1.5 rounded-full transition-colors">
                        <MapIcon className="w-4 h-4" />
                        <span>Open Map</span>
                        </button>
                    </div>
                    
                    <div className="h-48 md:h-64 w-full rounded-2xl overflow-hidden relative border border-gray-100 bg-gray-50">
                        <div className="absolute inset-0 opacity-60">
                            <HeatmapView key="setup-map" activeFilter="All" isBackground={true} />
                        </div>
                        {/* Map Avatars overlay simulation */}
                        <div className="absolute top-1/4 left-1/4 z-10 w-10 h-10 rounded-full bg-pink-100 border-2 border-white shadow-md flex items-center justify-center font-bold text-pink-600">MR</div>
                        <div className="absolute top-1/2 right-1/3 z-10 w-10 h-10 rounded-full bg-purple-100 border-2 border-white shadow-md flex items-center justify-center font-bold text-purple-600">D</div>
                        <div className="absolute bottom-1/4 left-1/3 z-10 w-10 h-10 rounded-full bg-green-100 border-2 border-white shadow-md flex items-center justify-center font-bold text-green-600">JR</div>
                        
                        {/* Gradient fade out at bottom */}
                        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white to-transparent" />
                    </div>
                </div>

                {/* TRUSTED CIRCLE SECTION */}
                <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Trusted Circle</h3>
                        <button className="text-[#E4537D] text-sm font-bold">Manage</button>
                    </div>

                    <div className="space-y-4">
                        {contacts.map((contact, idx) => (
                            <div key={contact.id || idx}>
                                <div className="flex items-center justify-between p-3 -mx-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-lg uppercase">
                                            {contact.avatar || contact.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{contact.name}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">{contact.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center space-x-1 text-gray-500 text-xs">
                                            <Battery className="w-3.5 h-3.5" />
                                            <span>{Math.floor(Math.random() * 40 + 60)}%</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
                                    </div>
                                </div>
                                {idx < contacts.length - 1 && <div className="h-px bg-gray-100 ml-16" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ADD TO CIRCLE CARD */}
                <button className="w-full bg-pink-50/50 hover:bg-pink-50 border border-pink-100 border-dashed rounded-3xl p-6 transition-colors group flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-pink-100 text-[#E4537D] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UserPlus className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1 text-lg">Add someone to your circle</h4>
                <p className="text-sm text-gray-500">They&apos;ll be able to see when you share</p>
                </button>
            </div>

            {/* PIN MODAL */}
            {showPinModal && (
                <div className="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center">
                {/* Backdrop click dismiss */}
                <div className="absolute inset-0" onClick={() => setShowPinModal(false)} />
                
                {/* Modal Content */}
                <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl p-6 sm:p-8 relative z-10 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
                    <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />
                    
                    <button 
                    onClick={() => setShowPinModal(false)}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                    >
                    <X className="w-5 h-5" />
                    </button>

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
                            <BellRing className="w-8 h-8 text-[#E4537D]" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Set a safety PIN</h3>
                        <p className="text-gray-500 text-sm">
                            You&apos;ll need this PIN to confirm you&apos;re safe when it&apos;s time to check in.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">Enter 4-Digit PIN</label>
                            <div className="flex justify-center">
                            <PinDigitInputs value={pinDigits} onChange={setPinDigits} autoFocus={true} />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">Confirm PIN</label>
                            <div className="flex justify-center">
                            <PinDigitInputs value={confirmDigits} onChange={setConfirmDigits} autoFocus={false} />
                            </div>
                        </div>

                        {formError && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl text-center">
                            {formError}
                            </div>
                        )}

                        <button
                            onClick={handleConfirmAndStart}
                            className="w-full bg-gradient-to-r from-[#F57FA0] to-[#DC4C79] text-white py-3.5 px-6 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Confirm & Start Sharing
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}