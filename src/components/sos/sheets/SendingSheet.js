"use client";

export default function SendingSheet({
  contacts,
  isWaClicked,
  handleOpenWhatsApp,
  handleFinishSending,
  onCancel,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm h-full gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 text-4xl animate-ping">
          🚨
        </div>

        <h2 className="text-base md:text-lg font-bold text-gray-900">
          Sending Emergency Alert...
        </h2>
        <p className="text-xs text-gray-400 max-w-xs">
          Local siren is sounding. Send location to WhatsApp contact below.
        </p>

        {/* Tombol Open WhatsApp */}
        <button
          type="button"
          onClick={handleOpenWhatsApp}
          className="w-full max-w-xs rounded-2xl bg-green-500 py-3 text-xs font-bold text-white transition hover:bg-green-600 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>💬</span> Open WhatsApp & Send GPS
        </button>

        {/* Tombol Continue (Hanya Aktif Jika WA Sudah Diklik) */}
        <button
          type="button"
          disabled={!isWaClicked}
          onClick={handleFinishSending}
          className={`w-full max-w-xs rounded-2xl py-3 text-xs font-bold text-white transition shadow-sm ${
            isWaClicked
              ? "bg-pink-500 hover:bg-pink-600 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed opacity-60"
          }`}
        >
          {isWaClicked ? "Already Sent? Continue →" : "Click WhatsApp Button First ⬆️"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full max-w-xs rounded-2xl border border-pink-300 py-2 text-xs font-bold text-pink-600 transition hover:bg-pink-50"
        >
          Cancel SOS
        </button>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900 border-b border-dashed border-gray-100 pb-3">
          Trusted contacts status
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

              <span className={`rounded-full px-3 py-1 text-xxs font-bold ${contact.status === "Notified" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700 animate-pulse"}`}>
                {contact.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}