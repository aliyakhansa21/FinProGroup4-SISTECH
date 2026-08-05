"use client";
import Image from "next/image";

export default function EndedSheet({
  shareLiveLocation,
  contacts,
  onBackHome,
}) {
  const selectedContactsCount = contacts.filter((c) => c.selected).length;

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
          <h1 className="text-2xl font-bold text-[#3a2a3f]">Glad you're safe! 💗</h1>
          <p className="text-sm text-gray-400 mt-3 max-w-sm md:max-w-md mx-auto leading-relaxed">
            Live location sharing has stopped and your trusted contacts have been notified that you're safe.
          </p>
        </div>

        {/* Summary Card */}
        <div className="w-full max-w-md mt-8 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-[22px] p-5 text-left border border-gray-50 flex flex-col gap-3">
          <h2 className="text-base font-bold text-[#3a2a3f] border-b border-dashed border-gray-200 pb-3">
            Emergency Summary
          </h2>
          
          <div className="bg-[#fdf5fc] rounded-2xl p-4 flex flex-col gap-3 text-sm text-gray-500">
             
             {/* Selected Contacts Count */}
             <div className="flex items-center gap-3">
                <Image src="/sos/people.svg" alt="Contacts" width={18} height={18} />
                <span className="font-medium text-[#71717a]">{selectedContactsCount} Trusted Contacts</span>
             </div>
             
             {/* Location Sharing Status */}
             <div className="flex items-start gap-3">
                <Image src="/location.svg" alt="Location" width={18} height={18} className="mt-0.5" />
                <span className="font-medium text-[#71717a]">
                  {shareLiveLocation ? "Lokasi dibagikan kepada kontak terpercaya" : "Lokasi tidak dibagikan kepada kontak terpercaya"}
                </span>
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