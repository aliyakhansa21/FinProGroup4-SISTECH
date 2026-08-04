"use client";

import {
  ArrowLeft,
  MapPin,
  Navigation,
  Clock3,
  ChevronRight,
  X,
  Bookmark,
  ArrowUp,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchSheet({
  destination,
  setDestination,
  onContinue,
}) {
  const [recentSearches, setRecentSearches] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);
  const [origin, setOrigin] = useState("Lokasi kamu sekarang");
  const [isManagingSaved, setIsManagingSaved] = useState(false);
  
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [locationToSave, setLocationToSave] = useState(null);
  const [saveAsCategory, setSaveAsCategory] = useState("Rumah");
  const [customName, setCustomName] = useState("");

  useEffect(() => {
    const storedRecent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const storedSaved = JSON.parse(localStorage.getItem('savedLocations') || '[]');
    
    const migratedSaved = storedSaved.map(item => {
      if (typeof item === 'string') return { name: item, address: item };
      return item;
    });

    setRecentSearches(storedRecent);
    setSavedLocations(migratedSaved);
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

  const handleOpenSaveModal = (dest, e) => {
    e.stopPropagation();
    setLocationToSave(dest);
    setSaveAsCategory("Rumah");
    setCustomName("");
    setIsSaveModalOpen(true);
  };

  const confirmSaveLocation = () => {
    let finalName = locationToSave;
    if (saveAsCategory === "Rumah") finalName = "Rumah";
    else if (saveAsCategory === "Lainnya" && customName.trim()) finalName = customName.trim();

    if (!savedLocations.some(s => s.address === locationToSave)) {
      const updated = [...savedLocations, { name: finalName, address: locationToSave }];
      setSavedLocations(updated);
      localStorage.setItem('savedLocations', JSON.stringify(updated));
    }
    setIsSaveModalOpen(false);
  };

  const removeSavedLocation = (address, e) => {
    e.stopPropagation();
    const updated = savedLocations.filter(s => s.address !== address);
    setSavedLocations(updated);
    localStorage.setItem('savedLocations', JSON.stringify(updated));
  };
  return (
    <div className="w-full rounded-t-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col min-h-[calc(100vh-120px)] relative overflow-hidden">

      {/* Header */}

      <div className="flex items-center gap-4">
        <button className="h-12 w-12 rounded-full bg-pink-50 flex items-center justify-center">
          <ArrowLeft size={20} className="text-pink-500" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">
          Safe Route
        </h1>
      </div>

      {/* Search Card */}

      <div className="mt-6 rounded-2xl border border-gray-200 p-4">

        {/* Origin */}

        <div className="flex items-center gap-3">

          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#00A15D]">
            <ArrowUp size={16} strokeWidth={3} className="text-white" />
          </div>

          <input
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Find you location..."
            className="w-full outline-none text-sm font-medium text-gray-900 bg-transparent"
          />

        </div>

        <div className="ml-4 h-6 border-l border-dashed border-gray-300" />

        {/* Destination */}

        <div className="flex items-center gap-5">

          <div className="flex flex-shrink-0 items-center justify-center">
            <MapPin size={24} className="text-pink-500 fill-pink-500" strokeWidth={1} />
          </div>

          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search destination..."
            className="w-full outline-none text-sm text-gray-900"
          />

        </div>

      </div>

      {/* Quick Destination */}

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">

        {savedLocations.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setDestination(item.address)}
            className="whitespace-nowrap rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <Bookmark size={14} className="text-gray-500 fill-gray-500" />
            {item.name}
          </button>
        ))}
        {savedLocations.length > 0 && (
          <div className="pl-1 flex items-center">
            <div className="h-6 w-px bg-gray-200 mx-1"></div>
            <button
              onClick={() => setIsManagingSaved(true)}
              className="flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 hover:bg-gray-50 flex-shrink-0 ml-1"
            >
              <ChevronRight size={16} className="text-gray-500" />
            </button>
          </div>
        )}

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
              className="flex w-full items-center gap-4 text-left group border-b border-dashed border-gray-100 pb-4 mb-4 last:border-0 last:mb-0"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 flex-shrink-0">
                <Clock3 size={14} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">{item.split(',')[0]}</h3>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item}</p>
              </div>
              
              <div className="flex items-center gap-3">
                {!savedLocations.some(s => s.address === item) && (
                  <Bookmark
                    size={16}
                    className="text-gray-300 hover:text-indigo-600 transition"
                    onClick={(e) => handleOpenSaveModal(item, e)}
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
        disabled={!destination || !origin}
        className="mt-auto w-full rounded-full bg-gray-900 py-4 font-semibold text-white disabled:bg-gray-300"
      >
        Continue
      </button>

      {/* Manage Saved Locations Modal */}
      {isManagingSaved && (
        <div className="absolute inset-0 z-50 flex flex-col bg-white rounded-t-[32px] p-8 h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Manage Saved Locations</h2>
            <button onClick={() => setIsManagingSaved(false)} className="p-2 rounded-full hover:bg-gray-100 transition">
              <X size={20} className="text-gray-700" />
            </button>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto">
            {savedLocations.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No saved locations</p>
            ) : (
              savedLocations.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <span className="font-semibold text-gray-900 block">{item.name}</span>
                    {item.name !== item.address && <span className="text-xs text-gray-500">{item.address}</span>}
                  </div>
                  <button
                    onClick={(e) => removeSavedLocation(item.address, e)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Save Location Modal */}
      {isSaveModalOpen && locationToSave && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center">
          <div className="w-full sm:w-[400px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:fade-in-0 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Tambah alamat</h2>
              <button onClick={() => setIsSaveModalOpen(false)} className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4 border border-gray-100 mb-6">
              <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <MapPin size={16} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{locationToSave}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{locationToSave}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-700 mb-3 font-medium">Simpan sebagai:</p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setSaveAsCategory("Rumah"); setCustomName(""); }}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    saveAsCategory === "Rumah" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  🏠 Rumah
                </button>
                <button
                  onClick={() => setSaveAsCategory("Lainnya")}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    saveAsCategory === "Lainnya" ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  🔖 Buat nama
                </button>
              </div>
              
              {saveAsCategory === "Lainnya" && (
                <input
                  type="text"
                  placeholder="Misal: Kantor"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="mt-4 w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-gray-900"
                />
              )}
            </div>

            <button
              onClick={confirmSaveLocation}
              disabled={saveAsCategory === "Lainnya" && !customName.trim()}
              className="w-full rounded-full bg-gray-900 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Simpan
            </button>
          </div>
        </div>
      )}

    </div>
  );
}