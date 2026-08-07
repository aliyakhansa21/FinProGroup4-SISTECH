"use client";
import Image from "next/image";

export default function ConfirmSafeModal({
  onClose,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 p-4">
      
      {/* Modal Container */}
      <div 
        className="relative flex flex-col items-center bg-white rounded-[20px] text-left text-[#dc2626] shadow-xl animate-in fade-in zoom-in-95 duration-200"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          width: "360px",
          maxWidth: "100%",
          maxHeight: "100%",
          overflow: "auto",
          padding: "16px 20px",
          gap: "17px",
          boxSizing: "border-box"
        }}
      >
        
        {/* SVG Question Mark - Retained size 100x100 */}
        <div className="relative shrink-0" style={{ width: "100px", height: "100px" }}>
          <Image src="/question-mark.svg" alt="Question Mark" fill className="object-contain" />
        </div>

        <div className="flex flex-col items-center self-stretch gap-[12px]">
          
          <div className="flex flex-col items-center self-stretch gap-[4px] text-center text-[18px] text-[#27272a]">
            <b className="relative inline-block leading-[28px]" style={{ width: "100%", maxWidth: "322px" }}>
              Are you sure you're safe?
            </b>
            <div className="relative self-stretch text-[12px] leading-[16px] text-[#9b8aa3]">
              Ending Emergency Mode will:
            </div>
          </div>
          
          <div className="flex items-center self-stretch rounded-[12px] bg-[#fef2f2] px-[20px] py-[10px] gap-[12px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative shrink-0 object-cover">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
            <div className="flex flex-col items-start w-[203.1px]">
              <div className="relative leading-[16px]">Turn off the siren</div>
            </div>
          </div>
          
          <div className="flex items-center self-stretch rounded-[12px] bg-[#fef2f2] px-[20px] py-[10px] gap-[12px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative shrink-0">
              <rect x="5" y="16" width="14" height="4" rx="1"></rect>
              <path d="M7 16v-4a5 5 0 0 1 10 0v4"></path>
              <path d="M12 4v-2"></path>
              <path d="M18 6l1.5-1.5"></path>
              <path d="M6 6L4.5 4.5"></path>
              <path d="M12 8l-1.5 3h3l-1.5 3"></path>
            </svg>
            <div className="flex flex-col items-start w-[203.1px]">
              <div className="relative leading-[16px]">End emergency mode</div>
            </div>
          </div>

        </div>

        <div 
          className="flex items-start self-stretch gap-[16px] text-center text-[16px] text-[#f57fa0]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          
          <button
            onClick={onClose}
            className="flex flex-1 items-center justify-center self-stretch rounded-[30px] border-2 border-[#f57fa0] bg-white px-[32px] py-[14px] transition hover:bg-pink-50"
          >
            <b className="relative">Cancel</b>
          </button>
          
          <button
            onClick={onConfirm}
            className="flex flex-1 items-center justify-center self-stretch rounded-[30px] bg-[#f57fa0] px-[32px] py-[14px] text-white transition hover:bg-pink-600 shadow-sm cursor-pointer"
          >
            <b className="relative shrink-0">Yes, I'm Safe</b>
          </button>

        </div>

      </div>
    </div>
  );
}