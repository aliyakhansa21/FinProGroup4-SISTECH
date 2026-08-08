"use client";

import Image from "next/image";
import SOSButton from "../ui/SOSButton";

export default function EmergencySheet({
  onBack,
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
    <div className="flex flex-col gap-6 w-full pb-10">
      
      {/* Top Section - Full Width (Mosaic 2 Top) */}
      <div className="w-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] md:shadow-sm md:border-x md:border-b md:border-t-0 md:border-gray-100 rounded-b-[20px] md:rounded-b-3xl md:rounded-t-none flex flex-col items-center justify-center px-5 pt-8 pb-10 md:py-12 relative z-10 gap-6">
        
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

        {/* Hero SOS Button */}
        <div className="flex flex-col items-center justify-center text-center mt-10 md:mt-12">
          <SOSButton
            onStartHold={startHold}
            onCancelHold={cancelHold}
            progress={holdProgress}
            isHolding={isHolding}
          />
          <h2 className="text-base md:text-lg font-bold text-gray-900 mt-2">
            Press & Hold to Activate SOS
          </h2>
          <p className="text-xs text-gray-500 mt-1 max-w-xs">
            We'll activate the siren and prepare your current location for sharing.
          </p>
        </div>
      </div>

      {/* Bottom Section - 2 Columns on Desktop (Mosaic 2 Bottom) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4 sm:px-6 md:px-0">
        
        {/* Primary Contact Card */}
        <div className="rounded-[22px] border border-gray-100 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/sos/people.svg" alt="Contact" width={20} height={20} />
              <h3 className="text-base font-bold text-gray-900">Primary Emergency Contact</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingContact(true)}
              className="flex h-[31px] w-[31px] items-center justify-center rounded-[10px] bg-[#fef3c7] hover:bg-amber-200 transition"
            >
              <Image src="/sos/Edit Icon.svg" alt="Edit" width={16} height={16} />
            </button>
          </div>

          <div className="w-full h-px border-t border-dashed border-gray-200" />

          {contacts.length > 0 && (() => {
            const primaryContact = contacts.find(c => c.selected) || contacts[0];
            return (
              <div className="flex items-center gap-3 rounded-2xl bg-[#fafafa] p-3">
                <div className="h-4 w-4 rounded-full border border-pink-500 bg-pink-500 flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px]">✓</span>
                </div>
                <div className="flex h-[36px] w-[36px] overflow-hidden rounded-full border-[1.1px] border-[#e0d0f9] shrink-0">
                  <div className="flex h-full w-full items-center justify-center bg-[#e0d0f9] text-xs font-bold text-[#4a3b7a]">
                    {primaryContact.avatar}
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-semibold text-[#3a2a3f] truncate">{primaryContact.name}</p>
                  <p className="text-xs text-gray-400 truncate">{primaryContact.phone}</p>
                </div>
              </div>
            );
          })()}

          {/* Change Primary Contact Modal */}
          {isAddingContact && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="flex w-full max-w-sm flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-900">Change Primary Contact</h3>
                  <button type="button" onClick={() => setIsAddingContact(false)} className="text-gray-400 hover:text-gray-600 transition">✕</button>
                </div>
                
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => {
                        toggleContact(contact.id);
                        setIsAddingContact(false);
                      }}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl p-3 transition ${contact.selected ? 'bg-pink-50 border border-pink-100' : 'bg-gray-50 hover:bg-gray-100 border border-transparent'}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e0d0f9] text-xs font-bold text-[#4a3b7a] shrink-0">
                          {contact.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-800 truncate">{contact.name}</p>
                          <p className="text-[10px] text-gray-400 truncate">{contact.phone}</p>
                        </div>
                      </div>
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${contact.selected ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}>
                        {contact.selected && <span className="text-white text-[10px]">✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Preview */}
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-3 h-fit">
          <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Image src="/location.svg" alt="Location" width={20} height={20} />
              <h3 className="text-sm font-bold text-gray-900">Emergency message preview</h3>
            </div>
            <button
              type="button"
              onClick={() => messageInputRef.current?.focus()}
              className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#fef3c7] hover:bg-amber-200 transition"
            >
              <Image src="/sos/Edit Icon.svg" alt="Edit" width={16} height={16} />
            </button>
          </div>

          <textarea
            ref={messageInputRef}
            rows={4}
            value={emergencyNote}
            onChange={(e) => setEmergencyNote(e.target.value)}
            placeholder="Hi, I may need help. Please check on me when you can."
            className="w-full resize-none rounded-2xl bg-pink-50/50 p-3 text-xs italic text-pink-900 leading-relaxed outline-none border border-transparent transition focus:border-pink-300 focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
}