"use client";

export default function SentSheet({
  shareLiveLocation,
  contacts,
  nearbyPlaces,
  onIAmSafe,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center text-center bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-500 text-3xl mb-3">
            🚨
          </div>
          {shareLiveLocation ? (
            <>
              <h2 className="text-base font-bold text-gray-900 max-w-xs">
                Your trusted contacts have been notified.
              </h2>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Siren is active and emergency location has been transmitted.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-base font-bold text-gray-900 max-w-xs">
                Local Siren Active 🚨
              </h2>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Emergency mode is running locally to attract attention.
              </p>
            </>
          )}
        </div>

        {/* SECTION DURASI KOSONG SEMENTARA SESUAI KESEPAKATAN */}

        <button
          type="button"
          onClick={onIAmSafe}
          className="w-full rounded-2xl border-2 border-pink-500 bg-white py-3.5 text-xs font-bold text-pink-600 transition hover:bg-pink-50 shadow-sm"
        >
          I'm safe now
        </button>
      </div>

      <div className="flex flex-col gap-5">
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900">Trusted contacts</h3>
          </div>

          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between rounded-2xl bg-gray-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-500/20 text-xs font-bold text-lavender-500">
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600 transition hover:bg-green-200 text-sm"
                  title="Call via WhatsApp"
                >
                  💬
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-3">
          <h3 className="text-sm font-bold text-gray-900 border-b border-dashed border-gray-100 pb-3">
            Nearby Safe Places
          </h3>

          <div className="flex flex-col gap-2">
            {nearbyPlaces.map((place) => (
              <div
                key={place.id}
                className="flex items-center justify-between rounded-2xl bg-gray-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{place.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{place.name}</p>
                    <p className="text-xxs text-gray-400">{place.distance}</p>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition hover:bg-pink-200 text-xs"
                  title="Route in Google Maps"
                >
                  📍
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}