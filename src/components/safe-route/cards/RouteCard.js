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
      <div className="p-3">

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl">
              🗺️
            </div>

            <div>
              <h3 className="font-bold text-sm text-gray-900">
                {route.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                <span className="font-semibold text-gray-700">{route.duration}</span> · {route.distance}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-lg font-bold text-emerald-600">
              {route.safetyScore}%
            </div>
            <div className="text-emerald-600 font-medium text-[10px]">
              Safe Route
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-3 py-2.5 rounded-b-[22px]">
        <div className="flex gap-1.5 flex-wrap">
          {route.tags?.map((tag) => (
            <span key={tag} className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-gray-600 shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}