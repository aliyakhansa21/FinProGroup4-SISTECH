"use client";
import Image from "next/image";

export default function ConfirmSafeModal({
  onClose,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-[20px] bg-white p-5 text-center shadow-xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* SVG Question Mark */}
        <div className="mb-2 flex items-center justify-center">
          <Image src="/question-mark.svg" alt="Question Mark" width={100} height={100} className="object-contain" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <h2 className="text-lg font-bold text-gray-900 leading-7">
            Are you sure?
          </h2>
          <p className="text-xs text-[#9b8aa3] leading-4">
            Ending Emergency Mode will stop location sharing.
          </p>
        </div>

        <div className="mt-2 flex w-full gap-4 text-base font-bold font-manrope">
          <button
            onClick={onClose}
            className="flex flex-1 items-center justify-center rounded-[30px] border-2 border-pink-500 bg-white py-3.5 text-pink-500 transition hover:bg-pink-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex flex-1 items-center justify-center rounded-[30px] bg-pink-500 py-3.5 text-white transition hover:bg-pink-600 shadow-md"
          >
            Yes, I'm safe
          </button>
        </div>

      </div>
    </div>
  );
}