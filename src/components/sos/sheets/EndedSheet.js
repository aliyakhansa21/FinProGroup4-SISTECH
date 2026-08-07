"use client";
import Image from "next/image";

export default function EndedSheet({
  duration,
  primaryContactName,
  status,
  onBackHome,
}) {
  return (
    <div className="flex flex-col gap-6 w-full pb-32 relative overflow-hidden min-h-[80vh] pt-16">
      
      {/* Blurred Pink Circle Background */}
      <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#f57fa0]/60 rounded-full blur-[100px] z-0 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center w-full px-5">
        
        {/* Mascot */}
        <Image 
          src="/happylove-maskot.png" 
          alt="Glad you're safe" 
          width={164} 
          height={164} 
          className="object-contain"
        />

        {/* Title & Message */}
        <div className="text-center mt-6">
          <h1 className="text-[24px] font-bold text-[#3a2a3f]">Glad you're safe! 💗</h1>
          <p className="text-[14px] text-[#a1a1aa] mt-2 max-w-[250px] mx-auto leading-[20px] font-['Plus_Jakarta_Sans']">
            Take a deep breath.<br/>We're happy you made it safely.
          </p>
        </div>

        {/* Summary Card */}
        <div className="w-full max-w-md mt-8 bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)] rounded-[22px] p-4 px-5 text-left flex flex-col gap-3 font-['Plus_Jakarta_Sans']">
          <b className="text-[16px] leading-[24px] text-[#3a2a3f]">Emergency Summary</b>
          <div className="w-full h-[1px] border-t border-dashed border-[#e4e4e7]"></div>
          
          <div className="bg-[#fdf5fc] rounded-[16px] p-3 flex flex-col gap-3 text-[12px] text-[#27272a]">
             
             {/* Duration */}
             <div className="w-full flex items-center justify-between gap-[20px]">
                <div className="flex items-center gap-[12px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <circle cx="12" cy="12" r="12" fill="#f57fa0"/>
                    <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="leading-[16px] font-medium">Duration</div>
                </div>
                <div className="leading-[16px] font-medium text-[#71717a]">{duration || "8 minutes"}</div>
             </div>
             
             {/* Primary Contact */}
             <div className="w-full flex items-center justify-between gap-[20px]">
                <div className="flex items-center gap-[12px]">
                  <Image src="/sos/contact.svg" alt="Contact" width={18} height={18} className="shrink-0 object-contain" />
                  <div className="leading-[16px] font-medium">Primary Contact</div>
                </div>
                <div className="leading-[16px] font-medium text-[#71717a]">{primaryContactName || "Dad"}</div>
             </div>

             {/* Status */}
             <div className="w-full flex items-center justify-between gap-[20px]">
                <div className="flex items-center gap-[12px]">
                  <Image src="/sos/done.svg" alt="Status" width={18} height={18} className="shrink-0 object-contain" />
                  <div className="leading-[16px] font-medium">Emergency mode ended</div>
                </div>
                <div className="leading-[16px] font-medium text-[#71717a]">
                  {status === 'canceled' ? 'Canceled' : 'Successfully'}
                </div>
             </div>

          </div>
        </div>
      </div>

      {/* Sticky Bottom Navigation - "Back to Home" */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-5xl bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)] rounded-t-[28px] border-t border-gray-200 flex flex-col items-center justify-center p-4 pb-6 z-50">
        <button
          type="button"
          onClick={onBackHome}
          className="w-full max-w-sm rounded-[30px] bg-[#f57fa0] h-[57px] text-base font-bold text-white transition hover:bg-pink-500 flex items-center justify-center shadow-[0_2px_16px_rgba(0,0,0,0.07)]"
        >
          Back to Home
        </button>
      </div>

    </div>
  );
}