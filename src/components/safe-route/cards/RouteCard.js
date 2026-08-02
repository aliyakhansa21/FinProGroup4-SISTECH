"use client";

export default function RouteCard({
  route,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-[22px] border bg-white text-left transition
      ${
        selected
          ? "border-gray-900 shadow-md ring-1 ring-gray-900"
          : "border-gray-200"
      }`}
    >
      <div className="p-5">

        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
              🗺️
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                {route.name}
              </h3>
              <p className="text-sm text-gray-500">
                {route.duration} · {route.distance}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xl font-bold text-emerald-600">
              {route.safetyScore}%
            </div>
            <div className="text-emerald-600 font-medium text-sm">
              Safe
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 rounded-b-[22px]">
        <div className="flex gap-2 flex-wrap">
          {route.tags?.map((tag) => (
            <span key={tag} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}