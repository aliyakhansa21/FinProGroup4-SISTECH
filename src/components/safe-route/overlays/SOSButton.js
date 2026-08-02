"use client";

export default function SOSButton({ onTriggerSOS }) {
  const handleClick = () => {
    if (onTriggerSOS) {
      onTriggerSOS();
    } else {
      alert("🚨 Emergency SOS Triggered! Sending location to emergency contacts.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-rose-700 active:scale-95"
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-200 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
      </span>
      SOS Emergency
    </button>
  );
}
