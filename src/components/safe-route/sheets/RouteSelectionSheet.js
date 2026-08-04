"use client";

import { useState } from "react";
import FloatingHeader from "../overlays/FloatingHeader";
import RouteCard from "../cards/RouteCard";

export default function RouteSelectionSheet({
  recommendedRoutes = [],
  selectedRoute,
  onSelectRoute,
  onBack,
  onContinue,
}) {
  const tabs = ["Safest", "Fastest", "Scenic"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="flex w-full max-h-[85vh] overflow-y-auto flex-col rounded-t-[34px] bg-white shadow-[0_-12px_40px_rgba(0,0,0,0.12)]">

      {/* Drag Handle */}
      <div className="flex shrink-0 justify-center pt-3">
        <div className="h-1.5 w-12 rounded-full bg-gray-300" />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden px-4 pt-2 pb-4">

        {/* Tabs */}
        <div className="mt-1 flex shrink-0 gap-2 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition
              ${
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-3 flex-1 space-y-3 overflow-y-auto pr-1 pb-1">
          {recommendedRoutes
            .filter((route) => route.category === activeTab)
            .map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              selected={selectedRoute?.id === route.id}
              onClick={() => onSelectRoute(route)}
            />
          ))}
        </div>

        <button
          onClick={onContinue}
          disabled={!selectedRoute}
          className="mt-3 shrink-0 w-full rounded-full bg-gray-900 py-3 font-semibold text-white disabled:bg-gray-300 transition hover:bg-gray-800"
        >
          Start Navigation
        </button>

      </div>
    </section>
  );
}