"use client";

import Image from "next/image";

export default function RouteCard({
  route,
  selected,
  onClick,
}) {
  const isHighSafety = (route.safetyScore ?? 0) >= 80;
  const isMediumSafety = (route.safetyScore ?? 0) >= 60 && (route.safetyScore ?? 0) < 80;

  // Circular progress math
  const strokeDasharray = 2 * Math.PI * 14; // roughly 87.96
  const strokeDashoffset = strokeDasharray - ((route.safetyScore || 0) / 100) * strokeDasharray;
  
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative w-full cursor-pointer rounded-[24px] text-left transition-all duration-200 overflow-hidden ${
        selected
          ? "border-[2px] border-[#fb7185] bg-[#fff1f2] shadow-sm"
          : "bg-white hover:bg-gray-50 border border-gray-100"
      }`}
    >
      <div className="p-4 sm:p-5 flex flex-col gap-4">
        
        {/* Header: Mascot/Icon + Title + Time */}
        <div className="flex gap-4 items-center">
          {["Safest", "Fastest", "Scenic"].includes(route.category) ? (
             <div className="w-12 h-12 shrink-0 relative flex items-center justify-center">
               <Image 
                 src={
                   route.category === "Safest" ? "/happylove-maskot.png" :
                   route.category === "Fastest" ? "/report-maskot.png" :
                   "/smile-maskot.png"
                 }
                 alt={`${route.category} Mascot`} 
                 width={48} 
                 height={48} 
                 className="object-contain"
               />
             </div>
          ) : null}

          <div className="flex-1 flex flex-col justify-center">
            <h3 className={`font-bold text-[17px] leading-tight mb-0.5 ${selected ? "text-gray-900" : "text-gray-700"}`}>
              {route.name}
            </h3>
            {/* Hardcoded time range for visual accuracy to mockup */}
            <div className="text-[13px] text-gray-400 font-medium">9:41–9:59</div>
          </div>
        </div>

        {/* Divider if selected */}
        {selected && (
            <div className="h-[1px] w-[calc(100%+2.5rem)] -mx-5 bg-[#fecdd3]/60"></div>
        )}

        {/* Middle: Duration, Distance, Safety Score */}
        <div className="flex items-center justify-between">
           <div className={`text-[17px] font-medium ${selected ? "text-gray-900" : "text-gray-600"}`}>
               {route.duration} · {route.distance}
           </div>
           
           <div className="flex items-center gap-2">
               <div className="relative w-10 h-10">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                     {/* Background Circle */}
                     <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                     {/* Progress Circle */}
                     <circle 
                        cx="18" cy="18" r="14" 
                        fill="none" 
                        stroke={isHighSafety ? "#10b981" : isMediumSafety ? "#f59e0b" : "#ef4444"} 
                        strokeWidth="4" 
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                     />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-800">
                     {route.safetyScore}%
                  </div>
               </div>
               <span className={`font-bold text-[15px] ${isHighSafety ? "text-[#10b981]" : isMediumSafety ? "text-[#f59e0b]" : "text-[#ef4444]"}`}>
                   {isHighSafety ? "Safe" : isMediumSafety ? "Moderate" : "Risky"}
               </span>
           </div>
        </div>
        
        {/* Footer: Tags */}
        <div className="flex gap-2 flex-wrap">
            {(route.tags || []).map(tag => (
                <div key={tag} className="rounded-full px-3 py-1 bg-white border border-gray-200 text-[11px] font-medium text-gray-500 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    {tag}
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}