"use client";

import {
  ArrowLeft,
  MapPin,
  Navigation,
  Clock3,
  ChevronRight,
  X,
} from "lucide-react";

const quickDestinations = [
  "Home",
  "Kos",
  "Friend's",
  "University",
];

const address = {
  Home: "Jl. Boulevard Raya, Kelapa Gading",
  Campus: "Jl. Halim Raya No.2, Tebet",
  "Mall Taman Anggrek": "Jl. Letjen S. Parman Kav.21",
};

export default function SearchSheet({
  destination,
  setDestination,
  recentSearches,
  onRecentSearch,
  onContinue,
}) {
  return (
    <div className="w-full rounded-t-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col min-h-[calc(100vh-120px)]">

      {/* Header */}

      <div className="flex items-center gap-3">

        <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">

          <ArrowLeft size={18} className="text-gray-700" />

        </button>

        <h1 className="text-xl font-bold text-gray-900">
          Safe Route
        </h1>

      </div>

      {/* Search Card */}

      <div className="mt-6 rounded-2xl border border-gray-200 p-4">

        {/* Origin */}

        <div className="flex items-center gap-3">

          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">

            <Navigation size={15} color="white" />

          </div>

          <input
            value="128 Oak Street"
            readOnly
            className="w-full outline-none text-sm font-medium text-gray-900"
          />

        </div>

        <div className="ml-4 h-6 border-l border-dashed border-gray-300" />

        {/* Destination */}

        <div className="flex items-center gap-3">

          <MapPin
            size={20}
            className="text-gray-700"
          />

          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search destination..."
            className="w-full outline-none text-sm text-gray-900"
          />

        </div>

      </div>

      {/* Quick Destination */}

      <div className="mt-4 flex gap-2 overflow-x-auto">

        {quickDestinations.map((item) => (
          <button
            key={item}
            onClick={() => setDestination(item)}
            className="whitespace-nowrap rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-900 hover:bg-gray-50"
          >
            {item}
          </button>
        ))}

        <button className="h-10 w-10 rounded-full border flex items-center justify-center">

          <ChevronRight size={18} />

        </button>

      </div>

      {/* Recent */}

      <div className="mt-8 space-y-5 mb-8">

        {recentSearches.map((item) => (
          <button
            key={item}
            onClick={() => onRecentSearch(item)}
            className="flex w-full items-start gap-4 text-left"
          >

            <div className="mt-1">

              <Clock3
                size={18}
                className="text-gray-400"
              />

            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-gray-900">

                {item}

              </h3>

              <p className="text-xs text-gray-500">

                {address[item]}

              </p>

            </div>

            <X
              size={16}
              className="text-gray-400"
            />

          </button>
        ))}

      </div>

      {/* Continue */}

      <button
        onClick={onContinue}
        disabled={!destination}
        className="mt-auto w-full rounded-full bg-gray-900 py-4 font-semibold text-white disabled:bg-gray-300"
      >

        Continue

      </button>

    </div>
  );
}