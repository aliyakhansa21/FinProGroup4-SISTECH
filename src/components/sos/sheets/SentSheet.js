"use client";
import Image from "next/image";

export default function SentSheet({
  onBack,
  shareLiveLocation,
  contacts,
  nearbyPlaces,
  onIAmSafe,
}) {
  return (
    <div className="flex flex-col gap-6 w-full pb-32">
      
      {/* Top Section - Full Width (Mosaic 2 Top) */}
      <div className="w-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] md:shadow-sm md:border-x md:border-b md:border-t-0 md:border-gray-100 rounded-b-[20px] md:rounded-b-3xl md:rounded-t-none flex flex-col items-center justify-center px-5 pt-20 pb-10 md:pt-24 md:pb-16 relative z-10 gap-6">
        
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

        {shareLiveLocation ? (
          <Image src="/sos/done.svg" alt="Done" width={100} height={100} className="object-contain" />
        ) : (
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[12px] border-red-100 animate-ping opacity-75"></div>
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg text-white">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
            </div>
          </div>
        )}

        <div className="text-center">
          {shareLiveLocation ? (
            <>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Your trusted contacts have been notified.
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                We're sharing your live location until you tell us you're safe.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl md:text-2xl font-bold text-red-600">
                Local Siren Active
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-md mx-auto">
                Find a secure location using Nearby Safe Places and manually contact your trusted people. Stay safe!
              </p>
            </>
          )}
        </div>
      </div>

      {/* Bottom Section - 2 Columns on Desktop (Mosaic 2 Bottom) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4 sm:px-6 md:px-0">
        
        {/* Trusted Contacts Card */}
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900">
              Trusted contacts
            </h3>
            <button className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#fef3c7] hover:bg-amber-200 transition">
              <Image src="/sos/Edit Icon.svg" alt="Edit" width={16} height={16} />
            </button>
          </div>

          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
            {contacts.map((contact) => (
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

                <a
                  href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe0d3] text-pink-600 transition hover:bg-pink-200"
                  title="Call via WhatsApp"
                >
                  <Image src="/sos/call.svg" alt="Call" width={20} height={20} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Safe Places Card */}
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
          <h3 className="text-sm font-bold text-gray-900 border-b border-dashed border-gray-100 pb-3">
            Nearby Safe Places
          </h3>

          <div className="flex flex-col gap-3">
            {nearbyPlaces.map((place) => (
              <div
                key={place.id}
                className="flex items-center justify-between rounded-2xl bg-gray-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{place.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{place.name}</p>
                    <p className="text-xxs text-gray-400">{place.distance}</p>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe0d3] text-pink-600 transition hover:bg-pink-200"
                  title="Route in Google Maps"
                >
                  <Image src="/sos/Navigate Icon.svg" alt="Navigate" width={20} height={20} />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Navigation - "I'm safe now" */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-5xl bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)] rounded-t-[28px] border-t border-gray-200 flex flex-col items-center justify-center p-4 pb-6 z-50">
        <button
          type="button"
          onClick={onIAmSafe}
          className="w-full max-w-sm rounded-[30px] border-2 border-pink-500 bg-white h-[57px] text-base font-bold text-pink-500 transition hover:bg-pink-50 flex items-center justify-center shadow-sm"
        >
          I'm safe now
        </button>
      </div>
    </div>
  );
}