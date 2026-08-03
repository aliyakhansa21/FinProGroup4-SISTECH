'use client';

import { useState, useEffect, useRef } from 'react';

const INITIAL_CONTACTS = [
  {
    id: '1',
    name: 'Budi Santoso',
    relation: 'Ayah (Emergency Contact 1)',
    phone: '+62 812-3456-7890',
    status: 'Notified',
    avatarBg: 'bg-blue-100 text-blue-700',
  },
  {
    id: '2',
    name: 'Siti Rahmawati',
    relation: 'Ibu (Emergency Contact 2)',
    phone: '+62 813-9876-5432',
    status: 'Notified',
    avatarBg: 'bg-pink-100 text-pink-700',
  },
  {
    id: '3',
    name: 'Layanan Darurat 112',
    relation: 'Pusat Panggilan Darurat',
    phone: '112',
    status: 'Connecting...',
    avatarBg: 'bg-red-100 text-red-700',
  },
];

export function useSOS(initialCountdownDuration = 5) {
  const [sosStatus, setSosStatus] = useState('idle'); // 'idle' | 'countdown' | 'sent' | 'ended'
  const [countdown, setCountdown] = useState(initialCountdownDuration);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [isSafeModalOpen, setIsSafeModalOpen] = useState(false);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [sosStartTime, setSosStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [userLocation, setUserLocation] = useState({
    address: 'Jl. Jend. Sudirman No. 12, Jakarta Selatan',
    lat: -6.2088,
    lng: 106.8456,
    accuracy: 'Akurat (±4m)',
  });

  const timerRef = useRef(null);
  const elapsedTimerRef = useRef(null);

  // Handle Countdown logic
  useEffect(() => {
    if (sosStatus === 'countdown') {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setElapsedSeconds(0);
            setSosStatus('sent');
            setSosStartTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sosStatus]);

  // Handle elapsed time after SOS is sent
  useEffect(() => {
    if (sosStatus === 'sent') {
      elapsedTimerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
    }

    return () => {
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
    };
  }, [sosStatus]);

  const startSOS = () => {
    setCountdown(initialCountdownDuration);
    setSosStatus('countdown');
  };

  const cancelSOS = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSosStatus('idle');
    setCountdown(initialCountdownDuration);
  };

  const triggerSending = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(0);
    setElapsedSeconds(0);
    setSosStatus('sent');
    setSosStartTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
  };

  const openSafeModal = () => {
    setIsSafeModalOpen(true);
  };

  const closeSafeModal = () => {
    setIsSafeModalOpen(false);
  };

  const confirmSafe = () => {
    setIsSirenActive(false);
    setIsSafeModalOpen(false);
    setSosStatus('ended');
  };

  const resetSOS = () => {
    setSosStatus('idle');
    setIsSirenActive(false);
    setIsSafeModalOpen(false);
    setCountdown(initialCountdownDuration);
    setElapsedSeconds(0);
  };

  const toggleSiren = () => {
    setIsSirenActive((prev) => !prev);
  };

  const callContact = (phone) => {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${phone}`;
    }
  };

  return {
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
  };
}

export default useSOS;
