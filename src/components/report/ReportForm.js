"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Import peta secara dinamis untuk menghindari error SSR
const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

export default function ReportForm() {
    const [incidentType, setIncidentType] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState(null);
    const [isOffline, setIsOffline] = useState(false);    
    const [isMapOpen, setIsMapOpen] = useState(false);

    // Menyimpan koordinat yang sedang ditunjuk sebelum menekan "Confirm" (SEMENTARA)
    const [tempCoords, setTempCoords] = useState({ lat: 41.8781, lng: -87.6298 });
    // Koordinat fix yang akan dikirim ke API setelah user menekan "Confirm Location"
    const [finalCoords, setFinalCoords] = useState(null);

    useEffect(() => {
        setIsOffline(!navigator.onLine);
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const isFormValid = incidentType !== "" && location !== "";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        const reportData = {
            incidentType,
            location,
            description,
            timestamp: new Date().toISOString(),
        };

        if (isOffline) {
            const existingDrafts = JSON.parse(localStorage.getItem("offlineReports") || "[]");
            existingDrafts.push(reportData);
            localStorage.setItem("offlineReports", JSON.stringify(existingDrafts));
            
            setMessage({ type: "error", text: "Connection lost. Report saved as draft and will retry upon network reconnect." });
            return;
        }

        setTimeout(() => {
            setMessage({ type: "success", text: "Anonymous Report Submitted Successfully" });
            setIncidentType("");
            setLocation("");
            setDescription("");
        }, 500);
    };

    // Fungsi simulasi saat user menekan "Confirm Location" di peta
    const handleConfirmLocation = () => {
        setFinalCoords(tempCoords);
        // show 4 decimal places for better readability
        setLocation(`Lat: ${tempCoords.lat.toFixed(4)}, Lng: ${tempCoords.lng.toFixed(4)}`); 
        setIsMapOpen(false);
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm relative">
            <h2 className="text-xl font-semibold text-gray-900">Report Details</h2>
            
            {message && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Location *</label>
                    <button 
                        type="button"
                        onClick={() => setIsMapOpen(true)}
                        className="w-full h-12 rounded-xl border border-gray-300 bg-gray-50 text-left px-3 text-gray-700 focus:border-purple-500 focus:ring-purple-500 flex justify-between items-center"
                    >
                        <span>{location ? "Location Selected" : "Tap to select location on map..."}</span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                    {location && <p className="mt-2 text-xs text-green-600 font-medium">{location}</p>}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Incident Type *</label>
                    <select 
                        value={incidentType}
                        onChange={(e) => setIncidentType(e.target.value)}
                        className="w-full h-12 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 px-3 focus:border-purple-500 focus:ring-purple-500"
                    >
                        <option value="">Select an incident type...</option>
                        <option value="Harassment">Harassment</option>
                        <option value="Following">Following / Stalking</option>
                        <option value="Physical Contact">Unwanted Physical Contact</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Description (Optional)</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add any extra details..."
                        className="w-full h-28 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 p-3 focus:border-purple-500 focus:ring-purple-500"
                    />
                </div>

                <button 
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full h-12 rounded-xl font-semibold transition-colors ${
                        isFormValid 
                        ? "bg-purple-600 text-white hover:bg-purple-700" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    }`}
                >
                Submit Report
                </button>
            </form>

            {/* MODAL FULL-SCREEN PETA */}
            {isMapOpen && (
                <div className="fixed inset-0 z-50 flex flex-col bg-gray-50">
                    {/* Header Modal */}
                    <div className="bg-white px-4 py-4 flex items-center border-b border-gray-200">
                        <button onClick={() => setIsMapOpen(false)} className="mr-4 text-gray-800">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 className="text-lg font-bold text-gray-900">Share Location</h2>
                    </div>

                    <div className="flex-1 relative bg-gray-200 flex flex-col items-center justify-center">
                        <p className="absolute top-6 text-gray-500 font-medium z-10 bg-white/80 px-4 py-2 rounded-full text-sm shadow-sm">
                            Tap on the map to select the location
                        </p>

                        <MapPicker onLocationSelect={(coords) => setTempCoords(coords)} />
                    </div>

                    {/* Footer / Bottom Sheet Modal */}
                    <div className="bg-white p-6 border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] rounded-t-3xl">
                        <div className="h-12 w-full border border-gray-300 rounded-xl mb-4 bg-gray-50 flex items-center px-4 text-gray-500 text-sm">
                            {tempCoords.lat.toFixed(5)}, {tempCoords.lng.toFixed(5)}
                        </div>
                        <button 
                            onClick={handleConfirmLocation}
                            className="w-full h-12 bg-gray-800 text-white rounded-xl font-semibold hover:bg-black transition-colors"
                        >
                            Confirm Location
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}