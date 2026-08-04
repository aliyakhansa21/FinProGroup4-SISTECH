'use client';

import React from 'react';
import useSOS from '../hooks/useSOS';
import EmergencySheet from '../sheets/EmergencySheet';
import SendingSheet from '../sheets/SendingSheet';
import SentSheet from '../sheets/SentSheet';
import EndedSheet from '../sheets/EndedSheet';
import ConfirmSafeModal from '../modals/ConfirmSafeModal';
import { ArrowLeft, ShieldAlert, Radio, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function SOSLayout({ customHook }) {
  const defaultHook = useSOS();
  const sos = customHook || defaultHook;

  const {
    sosStatus,
    countdown,
    initialCountdownDuration,
    isSirenActive,
    isSafeModalOpen,
    contacts,
    userLocation,
    sosStartTime,
    elapsedSeconds,
    startSOS,
    cancelSOS,
    triggerSending,
    openSafeModal,
    closeSafeModal,
    confirmSafe,
    resetSOS,
    toggleSiren,
    callContact,
  } = sos;

  const handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col justify-between overflow-hidden font-sans text-gray-900">
      {/* Dynamic Background Visuals */}
      <div className="absolute inset-0 z-0">
        {sosStatus === 'sent' ? (
          <div className="absolute inset-0 bg-red-950/90 animate-pulse transition-all duration-1000">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/30 rounded-full blur-3xl" />
          </div>
        ) : sosStatus === 'countdown' ? (
          <div className="absolute inset-0 bg-amber-950/80 transition-all duration-500">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/20 rounded-full blur-2xl animate-ping" />
          </div>
        ) : sosStatus === 'ended' ? (
          <div className="absolute inset-0 bg-emerald-950/80 transition-all duration-500">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-green-500/20 rounded-full blur-2xl" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl" />
          </div>
        )}
      </div>

      {/* Top Navigation Header */}
      <header className="relative z-10 p-4 sm:p-6 flex items-center justify-between text-white">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all text-sm font-semibold border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>

        {/* Header Status Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold">
          {sosStatus === 'sent' ? (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-red-400">SOS Berlangsung</span>
            </>
          ) : sosStatus === 'countdown' ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300">Menyiapkan</span>
            </>
          ) : sosStatus === 'ended' ? (
            <>
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-green-300">Aman</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="text-gray-300">Siaga Darurat</span>
            </>
          )}
        </div>
      </header>

      {/* Center Ambient Info Banner */}
      <div className="relative z-10 px-4 text-center my-auto flex flex-col items-center justify-center">
        {sosStatus === 'sent' && (
          <div className="animate-bounce mb-2">
            <Radio className="w-12 h-12 text-red-500 mx-auto" />
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {sosStatus === 'sent'
            ? 'Sinyal Darurat Aktif'
            : sosStatus === 'countdown'
            ? 'Mengirim Sinyal SOS...'
            : sosStatus === 'ended'
            ? 'Peringatan Selesai'
            : 'Sistem Darurat SOS'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xs mx-auto">
          {userLocation ? userLocation.address : 'Lokasi Terdeteksi'}
        </p>
      </div>

      {/* Bottom Sheet Area */}
      <section className="relative z-10 w-full max-w-2xl mx-auto">
        {sosStatus === 'idle' && (
          <EmergencySheet
            onStartSOS={startSOS}
            userLocation={userLocation}
            onCallEmergency={callContact}
          />
        )}

        {sosStatus === 'countdown' && (
          <SendingSheet
            countdown={countdown}
            initialCountdownDuration={initialCountdownDuration}
            onCancel={cancelSOS}
            onTriggerNow={triggerSending}
          />
        )}

        {sosStatus === 'sent' && (
          <SentSheet
            contacts={contacts}
            userLocation={userLocation}
            sosStartTime={sosStartTime}
            elapsedSeconds={elapsedSeconds}
            isSirenActive={isSirenActive}
            onToggleSiren={toggleSiren}
            onOpenSafeModal={openSafeModal}
            onCallContact={callContact}
          />
        )}

        {sosStatus === 'ended' && (
          <EndedSheet
            onResetSOS={resetSOS}
            onGoHome={handleGoHome}
            sosStartTime={sosStartTime}
          />
        )}
      </section>

      {/* Safety Confirmation Modal */}
      <ConfirmSafeModal
        isOpen={isSafeModalOpen}
        onClose={closeSafeModal}
        onConfirmSafe={confirmSafe}
      />
    </div>
  );
}
