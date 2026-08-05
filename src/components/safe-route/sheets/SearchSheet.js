"use client";

import {
  ChevronLeft,
  MapPin,
  Clock3,
  ChevronRight,
  X,
  Bookmark,
  ArrowUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchSheet({
  destination,
  setDestination,
  onContinue,
}) {
  const router = useRouter();
  const [recentSearches, setRecentSearches] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);
  const [origin, setOrigin] = useState("128 Oak Street");
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
    <div className="w-full bg-white flex flex-col font-sans min-h-screen">

      {/* Top Overlay Container */}
      <div className="w-full bg-white rounded-b-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] z-20 relative flex flex-col border-b border-gray-100 pb-5">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6 px-4 sm:px-6 pt-6">
          <button
            onClick={() => router.push('/')}
            className="h-11 w-11 rounded-[16px] bg-pink-50 flex flex-shrink-0 items-center justify-center hover:bg-pink-100 transition active:scale-95"
          >
            <ChevronLeft size={24} className="text-pink-500" strokeWidth={2.5} />
          </button>
          <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">
            Safe Route
          </h1>
        </div>

        {/* Search Container (Matching Figma Exactly) */}
        <div className="w-full px-4 sm:px-6 mb-4">
          <div className="w-full rounded-[20px] bg-white border border-gray-200 p-4 shadow-sm relative">

            {/* Dashed Connection Line */}
            <div className="absolute left-[27.5px] top-8 bottom-8 w-px border-l-[1.5px] border-dashed border-gray-300" />

            {/* Origin */}
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 relative z-10 shadow-sm">
                <ArrowUp size={14} strokeWidth={4} className="text-white" />
              </div>
              <input
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Your current location..."
                className="w-full bg-transparent outline-none text-[15px] font-medium text-gray-800"
              />
            </div>

            {/* Horizontal Separator */}
            <div className="ml-9 my-3.5 border-t border-gray-100" />

            {/* Destination */}
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center relative z-10">
                <MapPin size={24} className="text-pink-500 fill-pink-50" strokeWidth={2} />
              </div>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Search destination..."
                className="w-full bg-transparent outline-none text-[15px] font-medium text-gray-900 placeholder:text-gray-400"
                autoFocus
              />
            </div>
          </div>
        </div>

        {/* Quick Categories Container */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full px-4 sm:px-6">
          {savedLocations.length === 0 ? (
            <p className="text-sm text-gray-500 italic py-2">No saved locations</p>
          ) : (
            savedLocations.slice(0, 3).map((item, idx) => (
              <button
                key={idx}
                onClick={() => setDestination(item.address)}
                className="flex flex-shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 shadow-sm hover:bg-gray-50 active:scale-95 transition"
              >
                <Bookmark size={14} className="text-gray-500 fill-gray-500" />
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </button>
            ))
          )}
          
          <div className="pl-1 flex items-center flex-shrink-0">
            <button
              onClick={() => setIsManagingSaved(true)}
              className="flex items-center justify-center h-[38px] w-[38px] rounded-xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 active:scale-95 transition"
            >
              <ChevronRight size={18} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* History (Recent Searches) */}
      <div className="flex flex-col w-full px-4 sm:px-6 pt-6 pb-32 z-10 relative">
        {recentSearches.length === 0 ? (
          // Mock history to match Figma exactly if empty
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              <button className="flex w-full items-center justify-between py-3.5 text-left group">
                <div className="flex items-center gap-4">
                  <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                    <Clock3 size={18} className="text-white" strokeWidth={3} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-[15px]">Home</span>
                    <span className="text-xs text-gray-400 mt-0.5">Jl. Boulevard Raya, Kelapa Gading</span>
                  </div>
                </div>
                <X size={16} className="text-gray-400" />
              </button>
              <div className="w-full border-t-[1.5px] border-dashed border-gray-200 my-1" />
            </div>

            <div className="flex flex-col w-full">
              <button className="flex w-full items-center justify-between py-3.5 text-left group">
                <div className="flex items-center gap-4">
                  <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                    <Clock3 size={18} className="text-white" strokeWidth={3} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-[15px]">Campus</span>
                    <span className="text-xs text-gray-400 mt-0.5">Jl. Halimun Raya No. 2, Tebet</span>
                  </div>
                </div>
                <X size={16} className="text-gray-400" />
              </button>
              <div className="w-full border-t-[1.5px] border-dashed border-gray-200 my-1" />
            </div>

            <div className="flex flex-col w-full">
              <button className="flex w-full items-center justify-between py-3.5 text-left group">
                <div className="flex items-center gap-4">
                  <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                    <Clock3 size={18} className="text-white" strokeWidth={3} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-[15px]">Mall Taman Anggrek</span>
                    <span className="text-xs text-gray-400 mt-0.5">Jl. Letjen S. Parman Kav. 21, Grogol Petamburan</span>
                  </div>
                </div>
                <X size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        ) : (
          recentSearches.map((item, idx) => (
            <div key={item} className="flex flex-col w-full">
              <button
                onClick={() => setDestination(item)}
                className="flex w-full items-center justify-between py-3.5 group text-left transition hover:bg-gray-50/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                    <Clock3 size={18} className="text-white" strokeWidth={3} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-[15px]">{item.split(',')[0]}</span>
                    <span className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item}</span>
                  </div>
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
                    className="text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                    onClick={(e) => removeRecent(item, e)}
                  />
                </div>
              </button>
              {idx < recentSearches.length - 1 && (
                <div className="w-full border-t-[1.5px] border-dashed border-gray-200 my-1" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Seamless Fade Gradient at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-40" />

      {/* Continue Button */}
      <div className="fixed bottom-10 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-auto">
          <button
            onClick={handleContinueClick}
            disabled={!destination || !origin}
            className={`w-full rounded-full py-4 text-[15px] font-bold text-white shadow-xl transition-all ${
              destination && origin
                ? "bg-pink-500 active:scale-[0.98] hover:bg-pink-600"
                : "bg-gray-300 cursor-not-allowed shadow-none"
            }`}
          >
            Continue
          </button>
        </div>
      </div>

      {/* Manage Saved Locations Modal */}
      {isManagingSaved && (
        <div className="absolute inset-0 z-50 flex flex-col bg-white p-6 sm:p-8 h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Manage Saved Locations</h2>
            <button onClick={() => setIsManagingSaved(false)} className="p-2 rounded-full hover:bg-gray-100 transition">
              <X size={20} className="text-gray-700" />
            </button>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto">
            {savedLocations.length === 0 ? (
              <p className="text-sm text-gray-500 italic text-center mt-4">No saved locations</p>
            ) : (
              savedLocations.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-3 mt-2">
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
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center p-4 sm:p-0">
          <div className="w-full sm:w-[400px] bg-white rounded-3xl p-6 shadow-xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:fade-in-0 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Tambah alamat</h2>
              <button onClick={() => setIsSaveModalOpen(false)} className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition">
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
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${saveAsCategory === "Rumah" ? "border-pink-500 bg-pink-500 text-white shadow-md" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  🏠 Rumah
                </button>
                <button
                  onClick={() => setSaveAsCategory("Lainnya")}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${saveAsCategory === "Lainnya" ? "border-pink-500 bg-pink-500 text-white shadow-md" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
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
                  className="mt-4 w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                />
              )}
            </div>

            <button
              onClick={confirmSaveLocation}
              disabled={saveAsCategory === "Lainnya" && !customName.trim()}
              className="w-full rounded-full bg-pink-500 py-3.5 text-sm font-bold text-white transition hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              Simpan
            </button>
          </div>
        </div>
      )}

    </div>
  );
}