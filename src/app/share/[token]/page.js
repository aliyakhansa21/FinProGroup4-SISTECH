"use client";

import { useState, useEffect, use } from "react";
import dynamic from "next/dynamic";

// Import RouteMap secara dynamic (karena Leaflet butuh window object)
const RouteMap = dynamic(
  () => import("@/components/safe-route/map/RouteMap"),
  { ssr: false }
);

export default function PublicTrackingPage({ params }) {
  // Unwrap params token
  const unwrappedParams = use(params);
  const token = unwrappedParams.token;

  // Mock Data tracking
  const [trackingData, setTrackingData] = useState({
    origin: "128 Oak Street",
    destination: "Kuningan, Jakarta Selatan",
    status: "in_transit", // in_transit | arrived | sos
    estimatedTime: "18 min left",
    riskScore: "84% Safe Route",
    // Koordinat Rute Contoh (Chicago / Jakarta)
    startCoords: [-6.2088, 106.8456],
    endCoords: [-6.2297, 106.8295],
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Initial check
    const checkTracking = () => {
      const soraRaw = localStorage.getItem("sora_live_tracking");
      const shareRaw = localStorage.getItem("activeSharelock");

      if (shareRaw) {
        try {
          const parsed = JSON.parse(shareRaw);
          if (parsed.status === "active" || parsed.status === "grace_period" || parsed.status === "sos_triggered") {
            setTrackingData(prev => ({
              ...prev,
              status: parsed.status === "sos_triggered" ? "sos" : "in_transit"
            }));
            setIsExpired(false);
            return true;
          }
        } catch (e) {}
      }

      if (soraRaw) {
        try {
          const parsed = JSON.parse(soraRaw);
          if (parsed.active) {
            setTrackingData(prev => ({
              ...prev,
              origin: parsed.origin,
              destination: parsed.destination,
              startCoords: parsed.startCoords || prev.startCoords,
              endCoords: parsed.endCoords || prev.endCoords,
              status: "in_transit"
            }));
            setIsExpired(false);
            return true;
          }
        } catch (e) {}
      }

      setIsExpired(true);
      return false;
    };

    checkTracking();

    // Listen for cross-tab changes
    const handleStorageChange = (e) => {
      if (e.key === "sora_live_tracking" || e.key === "activeSharelock" || e.type === "sharelock:update") {
        checkTracking();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Support custom event from the same window if testing in single tab
    window.addEventListener("sharelock:update", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("sharelock:update", handleStorageChange);
    };
  }, []);

  if (isExpired) {
    return (
      <main className="h-[100dvh] w-full flex flex-col items-center justify-center bg-gray-50 px-6 font-sans">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl opacity-50">🔒</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Live Tracking Ended</h1>
        <p className="text-sm text-gray-500 text-center max-w-sm leading-relaxed">
          The user has safely ended their journey, or the tracking link has expired.
        </p>
      </main>
    );
  }

  return (
    <main className="relative h-[100dvh] w-full flex flex-col md:flex-row overflow-hidden">
      
      {/* BANNER DARURAT SOS (Jika Status SOS) */}
      {trackingData.status === "sos" && (
        <div className="absolute top-0 inset-x-0 z-50 bg-red-600 text-white px-4 py-3 shadow-lg flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2 text-xs md:text-sm font-bold">
            <span className="text-lg">🚨</span>
            <span>ACTIVE SOS WARNING: Commuter needs assistance!</span>
          </div>
          <a
            href="tel:110"
            className="rounded-xl bg-white px-3 py-1 text-xs font-bold text-red-600 hover:bg-gray-100"
          >
            Call Emergency (110)
          </a>
        </div>
      )}

      {/* DESKTOP SIDEBAR PANEL */}
      <aside className="hidden md:flex w-96 bg-white p-6 flex-col justify-between shadow-md z-20 h-screen overflow-y-auto">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h1 className="text-base font-bold text-gray-900">Sora</h1>
              <p className="text-xxs text-gray-400">Live Public Tracking ({token})</p>
            </div>
            
            <span className={`px-3 py-1 rounded-full text-xxs font-bold ${
              trackingData.status === "sos"
                ? "bg-red-100 text-red-700"
                : trackingData.status === "arrived"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700 animate-pulse"
            }`}>
              {trackingData.status === "sos" ? "🚨 SOS ACTIVE" : trackingData.status === "arrived" ? "🟢 Safely Arrived" : "🟡 In Transit"}
            </span>
          </div>

          <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">
                🟢
              </span>
              <p className="text-xs font-bold text-gray-800">{trackingData.origin}</p>
            </div>
            <div className="ml-2.5 h-4 w-0.5 border-l-2 border-dashed border-gray-300" />
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs">
                🔴
              </span>
              <p className="text-xs font-bold text-gray-800">{trackingData.destination}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-pink-50/40 p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold text-gray-800">
              <span>Status Perjalanan</span>
              <span className="text-pink-600">{trackingData.riskScore}</span>
            </div>
            <p className="text-xxs text-gray-500">
              Pengguna sedang melakukan perjalanan aman dengan estimasi waktu {trackingData.estimatedTime}.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${trackingData.startCoords[0]},${trackingData.startCoords[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center rounded-2xl bg-pink-500 py-3 text-xs font-bold text-white transition hover:bg-pink-600 shadow-sm"
          >
            Buka Lokasi di Google Maps 🗺️
          </a>
        </div>
      </aside>

      {/* MOBILE OVERLAY CARD */}
      <div className="md:hidden absolute top-4 inset-x-4 z-30 flex flex-col gap-2">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-md border border-gray-100 flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="text-xxs font-bold text-gray-400">LIVE TRACKING ({token})</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xxs font-bold ${
              trackingData.status === "sos"
                ? "bg-red-100 text-red-700"
                : trackingData.status === "arrived"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700 animate-pulse"
            }`}>
              {trackingData.status === "sos" ? "🚨 SOS ACTIVE" : trackingData.status === "arrived" ? "🟢 Arrived" : "🟡 In Transit"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs">🟢</span>
            <p className="text-xs font-bold text-gray-800 truncate">{trackingData.origin}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">🔴</span>
            <p className="text-xs font-bold text-gray-800 truncate">{trackingData.destination}</p>
          </div>
        </div>
      </div>

      {/* MAP AREA CONTAINER WITH LEAFLET */}
      <section className="relative flex-1 h-full w-full z-10 flex flex-col">
        <RouteMap
          startCoords={trackingData.startCoords}
          endCoords={trackingData.endCoords}
        />
      </section>

    </main>
  );
}