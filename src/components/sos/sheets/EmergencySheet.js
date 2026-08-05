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
      {/* Top Frame for SOS Button matching communityHeader */}
      <div className="w-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] rounded-b-[20px] flex flex-col items-center justify-end px-5 pt-10 pb-5 md:pt-14 relative z-10 shrink-0">
        <SOSButton
          onStartHold={startHold}
          onCancelHold={cancelHold}
          progress={holdProgress}
          isHolding={isHolding}
        />
      </div>

      {/* Settings Column */}
      <div className="flex flex-col gap-5 px-4 sm:px-6 md:px-0 pb-10 w-full max-w-5xl mx-auto">
        {/* Trusted Contacts Card */}
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900">Trusted contacts</h3>
            <button
              type="button"
              onClick={() => setIsAddingContact(true)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-700 hover:bg-amber-200 transition"
            >
              ✏️
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

      {/* Add Contact Modal */}
      {isAddingContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Tambah Kontak</h3>
              <button 
                onClick={() => setIsAddingContact(false)}
                className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Nama Kontak</label>
                <input
                  type="text"
                  placeholder="Misal: Ibu"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Nomor Telepon</label>
                <input
                  type="tel"
                  placeholder="Misal: 081234567890"
                  value={newContact.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 15) {
                      setNewContact({ ...newContact, phone: val });
                    }
                  }}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition bg-white"
                />
              </div>
              
              <button
                type="button"
                onClick={handleSaveNewContact}
                disabled={!newContact.name || newContact.phone.length < 9}
                className="w-full mt-2 rounded-xl bg-pink-500 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-pink-600 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
              >
                Simpan Kontak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}