export default function FeatureCard({
  title,
  description,
  disabled = false,
}) {
  return (
    <div
        className={`rounded-2xl border p-5 transition-all duration-200 ${
        disabled
            ? "cursor-not-allowed border-dashed border-gray-300 bg-gray-50"
            : "cursor-pointer border-gray-200 bg-white hover:-translate-y-1 hover:shadow-lg"
        }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {description}
          </p>
        </div>

        <div className="h-10 w-10 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}