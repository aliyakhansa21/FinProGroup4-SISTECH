"use client";

export default function NavigationSheet({
  duration = "18 min",
  distance = "1.4 km",
  message = "I'm right here with you. Well-lit stretch coming up.",
  onShare,
  onEnd,
}) {
  return (
    <section className="flex w-full flex-col rounded-t-[34px] bg-white shadow-[0_-12px_40px_rgba(0,0,0,0.12)]">
      <div className="flex shrink-0 justify-center pt-3">
        <div className="h-1.5 w-12 rounded-full bg-gray-300" />
      </div>

      <div className="flex flex-col px-4 pb-6 pt-4 sm:px-6 sm:pb-8">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col shrink-0">
            <span className="text-xs font-medium text-gray-400 sm:text-sm">Arriving in</span>
            <div className="text-lg font-bold text-gray-900 sm:text-xl">
              {duration} <span className="font-normal text-gray-500">· {distance}</span>
            </div>
          </div>

          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={onShare}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 sm:px-4 sm:py-2 sm:text-sm"
            >
              <span>🔗</span> Share
            </button>
            <button
              onClick={onEnd}
              className="flex items-center gap-1 px-2 py-1.5 text-xs font-semibold text-gray-400 transition hover:text-gray-600 sm:px-3 sm:py-2 sm:text-sm"
            >
              <span>✕</span> End
            </button>
          </div>
        </div>

        {message && (
          <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-pink-50 px-3 py-2.5 sm:mt-6 sm:gap-3 sm:px-4 sm:py-3">
            <span className="text-xl sm:text-2xl">☁️</span>
            <p className="text-xs font-medium text-pink-400 sm:text-sm">{message}</p>
          </div>
        )}
      </div>
    </section>
  );
}