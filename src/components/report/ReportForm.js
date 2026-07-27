"use client";

import { useState, useEffect } from "react";

export default function ReportForm() {
    const [incidentType, setIncidentType] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState(null);
    const [isOffline, setIsOffline] = useState(false);

    // detect network status changes
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

    // validation: check if required fields are filled
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

        // error scenario: if the user is offline, save the report as a draft in localStorage and show an error message
        if (isOffline) {
            const existingDrafts = JSON.parse(localStorage.getItem("offlineReports") || "[]");
            existingDrafts.push(reportData);
            localStorage.setItem("offlineReports", JSON.stringify(existingDrafts));
            
            setMessage({ type: "error", text: "Connection lost. Report saved as draft and will retry upon network reconnect." });
            return;
        }

        // main scenario: simulate sending the report to the backend
        setTimeout(() => {
            setMessage({ type: "success", text: "Anonymous Report Submitted Successfully" });
            setIncidentType("");
            setLocation("");
            setDescription("");
        }, 500);
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Report Details</h2>
            
            {message && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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
                    <label className="mb-2 block text-sm font-medium text-gray-700">Location *</label>
                    <input 
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Search or pin location on map..."
                        className="w-full h-12 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 px-3 focus:border-purple-500 focus:ring-purple-500"
                    />
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
        </div>
    );
}