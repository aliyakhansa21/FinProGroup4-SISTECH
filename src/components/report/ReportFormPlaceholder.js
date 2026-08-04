export default function ReportFormPlaceholder() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Report Details
      </h2>

      <div className="mt-6 space-y-5">
        <div>
          <div className="mb-2 h-4 w-32 rounded bg-gray-200"></div>
          <div className="h-12 rounded-xl border border-dashed border-gray-300 bg-gray-100"></div>
        </div>

        <div>
          <div className="mb-2 h-4 w-28 rounded bg-gray-200"></div>
          <div className="h-28 rounded-xl border border-dashed border-gray-300 bg-gray-100"></div>
        </div>

        <div>
          <div className="mb-2 h-4 w-24 rounded bg-gray-200"></div>
          <div className="h-20 rounded-xl border border-dashed border-gray-300 bg-gray-100"></div>
        </div>

        <div className="h-12 rounded-xl bg-gray-300"></div>
      </div>
    </div>
  );
}