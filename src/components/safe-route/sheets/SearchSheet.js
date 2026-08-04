"use client";

import {
  ArrowLeft,
  MapPin,
  Navigation,
  Clock3,
  ChevronRight,
  X,
  Bookmark,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchSheet({
  destination,
  setDestination,
  onContinue,
}) {
  const [recentSearches, setRecentSearches] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    try {
      const storedRecent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const sanitizedRecent = storedRecent.map(item => typeof item === 'string' ? item : item?.name || item?.address);
      setRecentSearches(sanitizedRecent.filter(Boolean));

      const storedSaved = JSON.parse(localStorage.getItem('savedLocations') || '[]');
      const sanitizedSaved = storedSaved.map(item => typeof item === 'string' ? item : item?.name || item?.address);
      setSavedLocations(sanitizedSaved.filter(Boolean));
    } catch(e) {
      setRecentSearches([]);
      setSavedLocations([]);
    }
  }, []);

  const saveRecent = (dest) => {
    if (!dest) return;
    const updated = [dest, ...recentSearches.filter(s => s !== dest)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleContinueClick = () => {
    saveRecent(destination);
    onContinue();
  };

  const removeRecent = (dest, e) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== dest);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const saveToSavedLocations = (dest, e) => {
    e.stopPropagation();
    if (savedLocations.includes(dest)) return;
    const updated = [...savedLocations, dest];
    setSavedLocations(updated);
    localStorage.setItem('savedLocations', JSON.stringify(updated));
  };
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

        {savedLocations.map((item) => (
          <button
            key={item}
            onClick={() => setDestination(item)}
            className="whitespace-nowrap rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-900 hover:bg-gray-50"
          >
            {item}
          </button>
        ))}

      </div>

      {/* Recent */}

      <div className="mt-8 space-y-5 mb-8">
        <h2 className="font-semibold text-gray-900 mb-2">Recent Searches</h2>
        
        {recentSearches.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No Recent Location</p>
        ) : (
          recentSearches.map((item) => (
            <button
              key={item}
              onClick={() => setDestination(item)}
              className="flex w-full items-start gap-4 text-left group"
            >
              <div className="mt-1">
                <Clock3 size={18} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item}</h3>
              </div>
              
              <div className="flex items-center gap-2">
                {!savedLocations.includes(item) && (
                  <Bookmark
                    size={16}
                    className="text-gray-400 hover:text-indigo-600 transition"
                    onClick={(e) => saveToSavedLocations(item, e)}
                  />
                )}
                <X
                  size={16}
                  className="text-gray-400 hover:text-red-500 transition"
                  onClick={(e) => removeRecent(item, e)}
                />
              </div>
            </button>
          ))
        )}
      </div>

      {/* Continue */}

      <button
        onClick={handleContinueClick}
        disabled={!destination}
        className="mt-auto w-full rounded-full bg-gray-900 py-4 font-semibold text-white disabled:bg-gray-300"
      >

        Continue

      </button>

    </div>
  );
}