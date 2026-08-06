"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, MapPin, ChevronDown, Bookmark } from "lucide-react";

// Memanggil HeatmapView secara dinamis agar tidak bentrok dengan SSR
const HeatmapView = dynamic(() => import("@/components/heatmap/HeatmapView"), { ssr: false });

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [savedLocations, setSavedLocations] = useState([]); 

  useEffect(() => {
    const storedSaved = JSON.parse(localStorage.getItem('savedLocations') || '[]');
    setSavedLocations(storedSaved);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/safe_route?destination=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full min-h-[100dvh] pb-32 bg-[#fffbfb] flex flex-col">
      
      {/* Top Map Area Container */}
      <div className="relative w-full h-[420px] md:h-[520px] bg-[#F5F5F9] shrink-0">
        
        {/* Real Heatmap Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <HeatmapView activeFilter="All" isBackground={true} />
          {/* Fade gradient at the bottom so the map blends nicely into the white background */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fffbfb] to-transparent z-[400] pointer-events-none"></div>
        </div>

        {/* Floating Header */}
        <div className="absolute top-0 left-0 right-0 z-[410] bg-[linear-gradient(180deg,#fff_43.65%,rgba(255,255,255,0.45))] rounded-b-[20px] shadow-[0px_1px_2px_rgba(0,0,0,0.08)] px-4 md:px-8 pt-5 md:pt-6 pb-5 md:pb-6 pointer-events-auto">
          <div className="max-w-7xl mx-auto px-2 md:px-6 flex items-center justify-between">
            <div>
              <p className="text-[#f57fa0] text-[13px] font-semibold flex items-center gap-1.5">
                Good Morning <span className="text-[13px]">✨</span>
              </p>
              <h1 className="text-[22px] md:text-3xl font-bold text-gray-900 mt-0.5 tracking-tight">Where to, Jane?</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-9 h-9 flex items-center justify-center relative hover:bg-gray-50 rounded-full transition-colors">
                <Bell className="w-[18px] h-[18px] text-gray-500 fill-gray-500" />
                <span className="absolute top-1 right-2 w-2 h-2 bg-[#f57fa0] rounded-full ring-2 ring-white"></span>
              </button>
              <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-indigo-300 transition-all">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Jane&backgroundColor=818cf8" className="w-full h-full object-cover" alt="Avatar" />
              </div>
            </div>
          </div>
        </div>

        {/* Plan Journey Card (Overlapping map bottom) */}
        <div className="absolute -bottom-28 left-0 right-0 z-30 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#f57fa0] to-[#ed5b82] rounded-[32px] p-5 md:p-7 shadow-xl shadow-pink-200/60 relative overflow-hidden group">
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="flex items-center gap-4 mb-5 md:mb-6 relative z-10">
                <Image src="/happylove-maskot.png" width={76} height={76} alt="Happy Cloud" className="w-[76px] h-[76px] md:w-[84px] md:h-[84px] object-contain drop-shadow-md shrink-0 -ml-1" />
                <div>
                  <h2 className="text-white font-bold text-[17px] md:text-xl">Plan a safe journey</h2>
                  <p className="text-pink-50 text-[13px] md:text-[15px] mt-0.5 md:mt-1">Where are you going today?</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-3 md:p-4 relative z-10 shadow-inner">
                <div className="flex items-center gap-3 px-3 md:px-4 py-3 bg-gray-50/80 rounded-2xl mb-3 hover:bg-gray-100 transition-colors border border-gray-100/50 focus-within:border-pink-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-pink-100">
                  <MapPin className="w-[18px] h-[18px] text-[#f57fa0]" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                    placeholder="Search destination..."
                    className="w-full bg-transparent text-[14px] md:text-[15px] text-gray-900 placeholder:text-gray-400 font-medium outline-none"
                  />
                  <Search className="w-[18px] h-[18px] md:w-5 md:h-5 text-gray-400 ml-auto shrink-0" />
                </div>
                <div className="flex items-center gap-2.5 md:gap-3 overflow-x-auto scrollbar-hide pb-0.5 px-1">
                  {savedLocations.slice(0,5).map((place, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => router.push(`/safe_route?destination=${encodeURIComponent(place.address)}`)}
                      className="flex items-center gap-2 px-3.5 md:px-5 py-2 md:py-2.5 bg-white border border-gray-200 rounded-[12px] md:rounded-[14px] shadow-sm shrink-0 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 transition-all group/btn"
                    >
                      <Bookmark className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600 fill-gray-600 group-hover/btn:text-pink-600 group-hover/btn:fill-pink-600 transition-colors" />
                      <span className="text-[12px] md:text-[13px] font-semibold text-gray-700 group-hover/btn:text-pink-600">{place.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Area (Stacked Layout) */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8 mt-40 pb-10 flex flex-col gap-12">
        
        {/* Area Safety */}
        <div>
          <div className="flex justify-between items-start mb-4 px-1">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-bold text-gray-900 tracking-tight">Area Safety</h3>
              <p className="text-[12px] md:text-[13px] text-gray-400 font-medium flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span> Live · Updated 2 mins ago
              </p>
            </div>
            <div className="flex items-center gap-1 text-[#f57fa0] text-[13px] font-medium bg-pink-50/50 px-3 py-1.5 rounded-xl">
              <MapPin className="w-4 h-4 fill-[#f57fa0]/20" />
              128 Oak Street
              <ChevronDown className="w-4 h-4 ml-0.5 opacity-70" />
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-shadow">
            {/* 84% Circle */}
            <div className="relative w-[110px] h-[110px] shrink-0 mb-3">
              <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
                <path
                  className="text-gray-100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="text-[#10B981]"
                  strokeDasharray="84, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-[#111827] tracking-tight">84%</span>
              </div>
            </div>

            <h4 className="text-[17px] font-bold text-[#10B981] mb-6">Safe</h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mb-6">
              <div className="bg-gray-50/80 text-[12px] font-medium text-gray-700 py-3 px-4 rounded-[14px] flex items-center justify-center gap-2 border border-gray-100/50">
                <span className="text-sm">☀️</span> Well Lit
              </div>
              <div className="bg-gray-50/80 text-[12px] font-medium text-gray-700 py-3 px-4 rounded-[14px] flex items-center justify-center gap-2 border border-gray-100/50">
                <span className="text-sm">🚓</span> Police Nearby
              </div>
              <div className="bg-gray-50/80 text-[12px] font-medium text-gray-700 py-3 px-4 rounded-[14px] flex items-center justify-center gap-2 border border-gray-100/50">
                <span className="text-sm">👥</span> Moderate Crowd
              </div>
              <div className="bg-gray-50/80 text-[12px] font-medium text-gray-700 py-3 px-4 rounded-[14px] flex items-center justify-center gap-2 border border-gray-100/50">
                <span className="text-sm">📍</span> 2 Reports
              </div>
            </div>

            <Link href="/heatmap" className="w-full bg-[#f57fa0] text-white text-[15px] font-bold py-4 rounded-[20px] flex items-center justify-center hover:bg-[#ed5b82] transition-colors shadow-sm shadow-pink-200 active:scale-[0.98]">
              View Heatmap
            </Link>
          </div>
        </div>

        {/* Nearby Reports */}
        <div>
          <div className="flex justify-between items-end mb-5 px-1">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-bold text-gray-900 tracking-tight">Nearby Reports</h3>
              <p className="text-[13px] text-gray-400 mt-1 font-medium">Heads-up on what's around you</p>
            </div>
            <div className="text-[11px] text-[#f57fa0] font-bold bg-pink-50/80 px-3 py-1.5 rounded-full">
              Within 800m
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            {[
              { icon: "❌", title: "Harassment reported", desc: "Elm St & 4th Ave", dist: "280 m", time: "12 min ago", color: "border-red-500" },
              { icon: "💡", title: "Poor lighting", desc: "Maple Ave & 5th St", dist: "400 m", time: "1 hour ago", color: "border-red-400" },
              { icon: "🚧", title: "Unsafe road", desc: "Pine St & 3rd Blvd", dist: "280 m", time: "Yesterday", color: "border-red-500" }
            ].map((report, idx) => (
              <Link href="/report" key={idx} className={`bg-white rounded-[24px] p-4.5 py-5 px-5 md:px-6 md:py-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 border-l-[4px] ${report.color} flex justify-between items-center hover:bg-gray-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all`}>
                <div className="flex gap-4 md:gap-5 items-center">
                  <div className="text-xl mt-0.5">{report.icon}</div>
                  <div>
                    <h4 className="text-[14px] md:text-[15px] font-bold text-gray-900">{report.title}</h4>
                    <p className="text-[12px] md:text-[13px] text-gray-500 mt-1 font-medium">{report.desc}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="text-[11px] md:text-[12px] font-bold text-[#f57fa0] bg-pink-50/80 px-2.5 md:px-3 py-1 rounded-full mb-1.5 md:mb-2">{report.dist} away</div>
                  <div className="text-[11px] md:text-[12px] text-gray-400 font-medium">{report.time}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Daily Safety Tip */}
        <div>
          <h3 className="text-[20px] md:text-[22px] font-bold text-gray-900 mb-5 px-1 tracking-tight">Daily Safety Tip</h3>
          <div className="flex flex-col gap-4">
            {[
              { icon: "happylove-maskot.png", title: "Share before you go", desc: "Send your live journey to a trusted contact the moment you set off." },
              { icon: "smile-maskot.png", title: "Trust the calm route", desc: "Well-lit, busier streets add a few minutes but a lot of peace of mind." },
              { icon: "smile-maskot.png", title: "Check in when home", desc: "A quick 'I'm safe' lets your circle relax — Asora can send it for you." }
            ].map((tip, idx) => (
              <div key={idx} className="bg-white rounded-[28px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-pink-50/30 flex gap-4 md:gap-6 items-center group cursor-pointer hover:border-pink-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all">
                <Image src={`/${tip.icon}`} width={68} height={68} alt="Tip icon" className="w-[68px] h-[68px] md:w-[76px] md:h-[76px] object-contain shrink-0 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm -ml-1 md:ml-0" />
                <div>
                  <h4 className="text-[14px] md:text-[16px] font-bold text-gray-900">{tip.title}</h4>
                  <p className="text-[12px] md:text-[13px] text-gray-500 mt-1.5 md:mt-2 leading-relaxed font-medium pr-2">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}