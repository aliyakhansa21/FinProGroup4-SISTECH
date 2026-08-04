"use client";

import SOSButton from "../ui/SOSButton";

export default function EmergencySheet({
  startHold,
  cancelHold,
  holdProgress,
  isHolding,
  shareLiveLocation,
  setShareLiveLocation,
  contacts,
  toggleContact,
  isAddingContact,
  setIsAddingContact,
  newContact,
  setNewContact,
  handleSaveNewContact,
  emergencyNote,
  setEmergencyNote,
  messageInputRef,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* Hero SOS Button */}
      <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm h-full">
        <SOSButton
          onStartHold={startHold}
          onCancelHold={cancelHold}
          progress={holdProgress}
          isHolding={isHolding}
        />
        <h2 className="text-base md:text-lg font-bold text-gray-900 mt-2">
          Tap and hold to send SOS
        </h2>
        <p className="text-xs text-gray-500 mt-1 max-w-xs">
          Alerts your trusted circle & activates local siren.
        </p>
      </div>

      {/* Settings Column */}
      <div className="flex flex-col gap-5">
        {/* Trusted Contacts Card */}
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900">Trusted contacts</h3>
            <button
              type="button"
              onClick={() => setIsAddingContact(!isAddingContact)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-700 hover:bg-amber-200 transition"
            >
              {isAddingContact ? "✕" : "✏️"}
            </button>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-pink-50/60 p-3">
            <span className="text-xs font-medium text-gray-700 leading-snug">
              Share Emergency Location to Trusted Contacts?
            </span>
            <input
              type="checkbox"
              checked={shareLiveLocation}
              onChange={(e) => setShareLiveLocation(e.target.checked)}
              className="h-5 w-5 accent-pink-500 cursor-pointer ml-2"
            />
          </div>

          <div className={`flex flex-col gap-2 max-h-60 overflow-y-auto pr-1 transition-opacity ${!shareLiveLocation ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => toggleContact(contact.id)}
                className="flex cursor-pointer items-center justify-between rounded-2xl bg-gray-50 p-3 transition hover:bg-gray-100"
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
                <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${contact.selected ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}>
                  {contact.selected && <span className="text-white text-xxs">✓</span>}
                </div>
              </div>
            ))}

            {isAddingContact && (
              <div className="mt-2 flex flex-col gap-3 rounded-2xl border border-pink-100 bg-pink-50/50 p-4">
                <input
                  type="text"
                  placeholder="Nama Kontak (mis: Ibu)"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-pink-500 bg-white"
                />
                <input
                  type="tel"
                  placeholder="Nomor Telepon (mis: +628...)"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-pink-500 bg-white"
                />
                <button
                  type="button"
                  onClick={handleSaveNewContact}
                  disabled={!newContact.name || !newContact.phone}
                  className="w-full rounded-xl bg-pink-500 py-2.5 text-xs font-bold text-white transition hover:bg-pink-600 disabled:bg-pink-300"
                >
                  Simpan Kontak
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Message Preview */}
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-pink-500">📍</span>
              <h3 className="text-sm font-bold text-gray-900">Emergency message preview</h3>
            </div>
            <button
              type="button"
              onClick={() => messageInputRef.current?.focus()}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-700 hover:bg-amber-200 transition"
            >
              ✏️
            </button>
          </div>

          <textarea
            ref={messageInputRef}
            rows={3}
            value={emergencyNote}
            onChange={(e) => setEmergencyNote(e.target.value)}
            placeholder="Hi, ini darurat! Saya mengaktifkan SOS dan mungkin butuh bantuan."
            className="w-full resize-none rounded-2xl bg-pink-50/50 p-3 text-xs italic text-pink-900 leading-relaxed outline-none border border-transparent transition focus:border-pink-300 focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
}