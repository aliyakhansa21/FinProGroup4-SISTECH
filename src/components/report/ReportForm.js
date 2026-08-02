"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

export default function ReportForm({ onSubmitStart, onSubmitSuccess } = {}) {
    const [incidentTitle, setIncidentTitle] = useState("");
    const [incidentType, setIncidentType] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [privacyMode, setPrivacyMode] = useState("anonymous"); 
    
    const [message, setMessage] = useState(null);
    const [isMapOpen, setIsMapOpen] = useState(false);
    
    const [tempCoords, setTempCoords] = useState({ lat: 41.8781, lng: -87.6298 });
    const [finalCoords, setFinalCoords] = useState(null);

    const isFormValid = incidentTitle !== "" && incidentType !== "" && location !== "";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        if (onSubmitStart) onSubmitStart();

        const reportData = {
            id: `local-${Date.now()}`,
            title: incidentTitle,
            category: incidentType,
            description,
            latitude: finalCoords ? finalCoords.lat : 41.8781,
            longitude: finalCoords ? finalCoords.lng : -87.6298,
            locationText: location,
            date,
            time,
            privacyMode,
            risk_score: 95, 
            risk_category: "Very High",
            timestamp: new Date().toISOString(),
        };

        const existingReports = JSON.parse(localStorage.getItem("localReports") || "[]");
        existingReports.push(reportData);
        localStorage.setItem("localReports", JSON.stringify(existingReports));

        setTimeout(() => {
            if (onSubmitSuccess) {
                onSubmitSuccess(reportData);
                return;
            }

            setMessage({ type: "success", text: "Report Submitted Successfully!" });
            setIncidentTitle("");
            setIncidentType("");
            setDescription("");
            setLocation("");
            setDate("");
            setTime("");
            setFinalCoords(null);

            setTimeout(() => setMessage(null), 3000);
        }, 500);
    };

    const handleConfirmLocation = () => {
        setFinalCoords(tempCoords);
        setLocation(`Lat: ${tempCoords.lat.toFixed(4)}, Lng: ${tempCoords.lng.toFixed(4)}`); 
        setIsMapOpen(false);
    };

    return (
        <div className="relative">
            {message && (
                <div className={`mb-4 p-4 rounded-2xl text-sm font-medium text-center ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 pb-28 md:pb-32">
                
                {/* Section: What happened? */}
                <div className="bg-white rounded-2xl p-5 md:p-8 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all">
                    <div className="flex items-center gap-2 mb-4 md:mb-6 text-gray-900 font-semibold">
                        <span className="text-lg md:text-xl">🔍</span>
                        <h2 className="md:text-lg">What happened?</h2>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label className="text-xs md:text-sm font-medium text-gray-500 mb-1.5 md:mb-2 block">Incident title</label>
                            <input 
                                type="text"
                                value={incidentTitle}
                                onChange={(e) => setIncidentTitle(e.target.value)}
                                placeholder="e.g. Broken streetlight on Elm Alley"
                                className="w-full h-12 md:h-14 rounded-xl border border-gray-200 bg-white px-4 text-sm md:text-base text-gray-900 focus:border-[#F57FA0] focus:ring-1 focus:ring-[#F57FA0] outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-xs md:text-sm font-medium text-gray-500 mb-1.5 md:mb-2 block">Category</label>
                            <select 
                                value={incidentType}
                                onChange={(e) => setIncidentType(e.target.value)}
                                className="w-full h-12 md:h-14 rounded-xl border border-gray-200 bg-white px-4 text-sm md:text-base text-gray-900 focus:border-[#F57FA0] focus:ring-1 focus:ring-[#F57FA0] outline-none appearance-none transition-all"
                            >
                                <option value="" disabled>Select category...</option>
                                <option value="Harassment">Harassment</option>
                                <option value="Poor Lighting">Poor Lighting</option>
                                <option value="Unsafe Road">Unsafe Road</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs md:text-sm font-medium text-gray-500 mb-1.5 md:mb-2 block">Description</label>
                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what you noticed..."
                                className="w-full h-24 md:h-32 rounded-xl border border-gray-200 bg-white p-4 text-sm md:text-base text-gray-900 focus:border-[#F57FA0] focus:ring-1 focus:ring-[#F57FA0] outline-none resize-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Section: Where did it happen? */}
                <div className="bg-white rounded-2xl p-5 md:p-8 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all">
                    <div className="flex items-center gap-2 mb-4 md:mb-6 text-gray-900 font-semibold">
                        <span className="text-lg md:text-xl">📌</span>
                        <h2 className="md:text-lg">Where did it happen?</h2>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label className="text-xs md:text-sm font-medium text-gray-500 mb-1.5 md:mb-2 block">Location</label>
                            <button 
                                type="button"
                                onClick={() => setIsMapOpen(true)}
                                className="w-full h-12 md:h-14 rounded-xl border border-gray-200 bg-white px-4 text-sm md:text-base text-gray-500 flex justify-between items-center hover:bg-gray-50 focus:border-[#F57FA0] focus:ring-1 focus:ring-[#F57FA0] outline-none transition-all"
                            >
                                <span className={location ? "text-gray-900" : "text-gray-400"}>
                                    {location || "Current Location"}
                                </span>
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-6">
                            <div>
                                <label className="text-xs md:text-sm font-medium text-gray-500 mb-1.5 md:mb-2 block">Time</label>
                                <input 
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full h-12 md:h-14 rounded-xl border border-gray-200 bg-white px-4 text-sm md:text-base text-gray-900 focus:border-[#F57FA0] focus:ring-1 focus:ring-[#F57FA0] outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-xs md:text-sm font-medium text-gray-500 mb-1.5 md:mb-2 block">&nbsp;</label>
                                <input 
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full h-12 md:h-14 rounded-xl border border-gray-200 bg-white px-4 text-sm md:text-base text-gray-900 focus:border-[#F57FA0] focus:ring-1 focus:ring-[#F57FA0] outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section: Evidence */}
                <div className="bg-white rounded-2xl p-5 md:p-8 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all">
                    <div className="flex items-center gap-2 mb-4 md:mb-6 text-gray-900 font-semibold">
                        <span className="text-lg md:text-xl">📷</span>
                        <h2 className="md:text-lg">Evidence <span className="text-gray-400 font-normal text-sm md:text-base">(Optional)</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                        <button type="button" className="h-24 md:h-32 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-gray-50 hover:border-gray-400 transition-all">
                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <span className="text-xs md:text-sm font-medium">Add photo</span>
                        </button>
                        <button type="button" className="h-24 md:h-32 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-gray-50 hover:border-gray-400 transition-all">
                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            <span className="text-xs md:text-sm font-medium">Add video</span>
                        </button>
                    </div>
                </div>

                {/* Section: Privacy */}
                <div className="bg-white rounded-2xl p-5 md:p-8 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all">
                    <div className="flex items-center gap-2 mb-4 md:mb-6 text-gray-900 font-semibold">
                        <span className="text-lg md:text-xl">👤</span>
                        <h2 className="md:text-lg">Privacy</h2>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <label className="flex items-start gap-3 md:gap-4 cursor-pointer group">
                            <div className="flex items-center h-5 md:h-6">
                                <input 
                                    type="radio" 
                                    name="privacy" 
                                    checked={privacyMode === "anonymous"}
                                    onChange={() => setPrivacyMode("anonymous")}
                                    className="w-4 h-4 md:w-5 md:h-5 text-[#ED6690] bg-gray-100 border-gray-300 focus:ring-[#ED6690]" 
                                />
                            </div>
                            <div>
                                <p className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#ED6690] transition-colors">Report anonymously</p>
                                <p className="text-xs md:text-sm text-gray-500 mt-0.5">Nothing is linked to your profile.</p>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 md:gap-4 cursor-pointer group">
                            <div className="flex items-center h-5 md:h-6">
                                <input 
                                    type="radio" 
                                    name="privacy"
                                    checked={privacyMode === "profile"}
                                    onChange={() => setPrivacyMode("profile")}
                                    className="w-4 h-4 md:w-5 md:h-5 text-[#ED6690] bg-gray-100 border-gray-300 focus:ring-[#ED6690]" 
                                />
                            </div>
                            <div>
                                <p className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#ED6690] transition-colors">Report using my profile</p>
                                <p className="text-xs md:text-sm text-gray-500 mt-0.5">Others can thank and follow up with you.</p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Fixed Submit Button */}
                <div className="fixed bottom-0 left-0 right-0 p-4 md:py-6 bg-white/90 md:bg-white/80 backdrop-blur-md border-t border-gray-100 z-10 max-w-md md:max-w-2xl mx-auto transition-all">
                    <button 
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full h-14 md:h-16 rounded-2xl md:rounded-full font-bold text-sm md:text-base transition-all shadow-sm ${
                            isFormValid 
                            ? "bg-[#F57FA0] text-white hover:bg-[#ED6690] hover:scale-[1.01]" 
                            : "bg-gray-200 text-gray-400 cursor-not-allowed" 
                        }`}
                    >
                        Submit Report
                    </button>
                </div>
            </form>

            {/* Modal MapPicker */}
            {isMapOpen && (
                <div className="fixed inset-0 z-50 flex flex-col md:items-center md:justify-center bg-white md:bg-black/60 md:backdrop-blur-sm md:p-6 transition-all">
                    <div className="flex flex-col w-full h-full md:max-w-3xl md:h-[80vh] bg-white md:rounded-3xl md:overflow-hidden md:shadow-2xl">
                        
                        <div className="px-4 md:px-6 py-4 flex items-center border-b border-gray-100 bg-white">
                            <button onClick={() => setIsMapOpen(false)} className="mr-4 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h2 className="text-lg md:text-xl font-bold text-gray-900">Select Location</h2>
                        </div>

                        <div className="flex-1 relative bg-gray-100">
                            <MapPicker onLocationSelect={(coords) => setTempCoords(coords)} />
                        </div>

                        <div className="bg-white p-5 md:p-6 border-t border-gray-100 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                            <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 text-center font-medium">
                                Coordinate: {tempCoords.lat.toFixed(5)}, {tempCoords.lng.toFixed(5)}
                            </p>
                            <button 
                                onClick={handleConfirmLocation}
                                className="w-full h-14 md:h-16 bg-[#F57FA0] text-white rounded-2xl md:rounded-full font-bold text-sm md:text-base shadow-sm hover:bg-[#ED6690] transition-colors"
                            >
                                Confirm Location
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}