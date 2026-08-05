"use client";
import Image from "next/image";

export default function SendingSheet({
  onBack,
  contacts,
  isWaClicked,
  handleOpenWhatsApp,
  handleFinishSending,
  onCancel,
}) {
  return (
    <div className="flex flex-col gap-6 w-full pb-32">
      
      {/* Top Frame - Full Width (Mosaic 2 Top) */}
      <div className="w-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] md:shadow-sm md:border-x md:border-b md:border-t-0 md:border-gray-100 rounded-b-[20px] md:rounded-b-3xl md:rounded-t-none flex flex-col items-center justify-center px-5 pt-20 pb-10 md:pt-24 relative z-10 gap-6">
        
        {/* Embedded Header Navigation */}
        <div className="flex items-center gap-3 w-full max-w-sm md:max-w-none justify-start absolute top-4 md:top-8 left-4 md:left-8">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition hover:bg-pink-200"
            aria-label="Back"
          >
            <Image src="/back-button.svg" alt="Back" width={24} height={24} />
          </button>
          <h1 className="text-lg md:text-xl font-bold text-gray-900">Emergency SOS</h1>
        </div>

        {/* Vibrating Alarm Icon */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-[12px] border-red-100 animate-ping opacity-75"></div>
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 text-4xl shadow-lg">
            🚨
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-red-600">
            Sending Emergency Alert...
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-xs mx-auto">
            Local siren is sounding. Send your live location to WhatsApp contacts below.
          </p>
        </div>

        {/* WA Logic Buttons */}
        <div className="w-full max-w-sm flex flex-col gap-3 mt-2">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full rounded-2xl bg-[#22C55E] py-4 text-sm font-bold text-white transition hover:bg-green-600 shadow-md flex items-center justify-center gap-2"
          >
            <Image src="/sos/call.svg" alt="WhatsApp" width={20} height={20} className="mr-1" /> Open WhatsApp & Send GPS
          </button>

          <button
            type="button"
            disabled={!isWaClicked}
            onClick={handleFinishSending}
            className={`w-full rounded-2xl py-4 text-sm font-bold text-white transition shadow-md ${
              isWaClicked
                ? "bg-pink-500 hover:bg-pink-600 cursor-pointer"
                : "bg-gray-200 text-gray-500 cursor-not-allowed opacity-80"
            }`}
          >
            {isWaClicked ? "Already Sent? Continue →" : "Click WhatsApp Button First ⬆️"}
          </button>
        </div>
      </div>

      {/* Settings Column */}
      <div className="flex flex-col gap-6 px-4 sm:px-6 md:px-0 w-full max-w-5xl mx-auto">
        {/* Trusted Contacts Card */}
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
          <h3 className="text-sm font-bold text-gray-900 border-b border-dashed border-gray-100 pb-3">
            Trusted contacts
          </h3>

          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
            {contacts.filter((c) => c.selected).map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between rounded-2xl bg-gray-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender-500/20 text-xs font-bold text-lavender-500">
                    {contact.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{contact.name}</p>
                    <p className="text-xxs text-gray-400">{contact.phone}</p>
                  </div>
                </div>

                <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${contact.status === "Notified" ? "bg-[#dbfce7] text-[#016630]" : "bg-[#fef3c7] text-[#92400e] animate-pulse"}`}>
                  {contact.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Navigation - "Cancel SOS" */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-5xl bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)] rounded-t-[28px] border-t border-gray-200 flex flex-col items-center justify-center p-4 pb-6 z-50">
        <button
          type="button"
          onClick={onCancel}
          className="w-full max-w-sm rounded-[30px] border-2 border-pink-500 bg-white h-[57px] text-base font-bold text-pink-500 transition hover:bg-pink-50 flex items-center justify-center shadow-sm"
        >
          Cancel SOS
        </button>
      </div>
    </div>
  );
}