"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  ShieldAlert,
  Navigation,
  Zap,
  Sparkles,
  Footprints,
  Bike,
  Car,
  Video,
  Lightbulb,
  Users,
  Filter,
} from "lucide-react";
import RouteCard from "../cards/RouteCard";

export default function RouteSelectionSheet({
  recommendedRoutes = [],
  selectedRoute,
  onSelectRoute,
  onBack,
  onContinue,
}) {
  const [activeTab, setActiveTab] = useState("Safest");
  const [travelMode, setTravelMode] = useState("walk");

  const routesToDisplay = recommendedRoutes || [];

  // Filter category tabs
  const tabs = [
    { id: "Safest", label: "Safest" },
    { id: "Fastest", label: "Fastest" },
    { id: "Scenic", label: "Scenic" },
  ];

  const filteredRoutes = routesToDisplay.filter((route) => {
    if (activeTab === "Semua") return true;
    return route.category?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <section className="flex w-full flex-col max-h-[45vh] md:max-h-[50vh] lg:max-h-full overflow-hidden rounded-t-[34px] lg:rounded-none bg-white shadow-[0_-12px_40px_rgba(0,0,0,0.12)] lg:shadow-none transition-all duration-300">
      
      {/* Mobile Drag Handle Bar */}
      <div className="flex shrink-0 items-center justify-center pt-3 pb-1 lg:hidden">
        <div className="h-1.5 w-12 rounded-full bg-gray-300 transition hover:bg-gray-400" />
      </div>

      {/* Main Content Scrollable & Structured Wrapper */}
      <div className="flex flex-1 flex-col overflow-hidden px-4 pt-1 pb-4 sm:px-6 sm:pb-6 md:px-6">
        
        {/* Top Actions: Tabs and Close Button */}
        <div className="flex items-center justify-between mt-2 mb-3">
          {/* Category Filter Tabs */}
          <div className="flex shrink-0 gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center whitespace-nowrap rounded-full px-5 py-1.5 text-[14px] sm:text-[15px] font-medium transition active:scale-95 ${
                    isActive
                      ? "bg-[#fb7185] text-white"
                      : "border border-[#fb7185] bg-white text-[#fb7185] hover:bg-[#fff1f2]"
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Close Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition ml-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          )}
        </div>

        {/* Route Cards List */}
        <div className="mt-3 flex-1 space-y-3 overflow-y-auto pr-0.5 pb-2 scrollbar-thin scrollbar-thumb-gray-200">
          {filteredRoutes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <ShieldAlert size={40} className="text-gray-300 mb-2" />
              <p className="text-sm font-semibold text-gray-600">Tidak ada rute untuk kategori ini</p>
              <p className="text-xs text-gray-400 mt-1">Silakan pilih kategori rute lain di atas</p>
            </div>
          ) : (
            filteredRoutes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                selected={selectedRoute?.id === route.id}
                onClick={() => onSelectRoute(route)}
              />
            ))
          )}
        </div>

        {/* Removed selected route highlights banner to match Figma exactly */}

        {/* Start Navigation Action Button */}
        <div className="mt-3 shrink-0 pt-3 pb-2">
          <button
            onClick={onContinue}
            disabled={!selectedRoute}
            className={`flex w-full items-center justify-center rounded-full py-4 px-6 text-[17px] font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
              selectedRoute
                ? "bg-[#fb7185] hover:bg-[#e11d48] shadow-[#fb7185]/30 cursor-pointer"
                : "bg-gray-300 shadow-none cursor-not-allowed text-gray-500"
            }`}
          >
            <span>Start Navigation</span>
            <span className="ml-2">›</span>
          </button>
        </div>

      </div>
    </section>
  );
}