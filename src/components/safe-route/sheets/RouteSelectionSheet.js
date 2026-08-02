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
    <section className="flex w-full max-h-[65vh] flex-col rounded-t-[34px] bg-white shadow-[0_-12px_40px_rgba(0,0,0,0.12)]">

      {/* Drag Handle */}
      <div className="flex shrink-0 justify-center pt-3">
        <div className="h-1.5 w-12 rounded-full bg-gray-300" />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden px-6 pt-4 pb-8">

        {/* Close */}
        <div className="flex shrink-0 justify-end">
          <button onClick={onBack} className="text-3xl text-gray-500">
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-2 flex shrink-0 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-1.5 text-sm transition
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
        <div className="mt-5 flex-1 space-y-4 overflow-y-auto pr-2 pb-2">
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
          className="mt-6 shrink-0 w-full rounded-xl bg-gray-900 py-4 font-semibold text-white disabled:bg-gray-300 transition hover:bg-gray-800"
        >
          Start Navigation →
        </button>

      </div>
    </section>
  );
}