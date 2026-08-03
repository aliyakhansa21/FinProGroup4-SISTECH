"use client";

export default function ConfirmSafeModal({
  onCancel,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-3xl bg-white p-8">

        <h2 className="text-xl font-bold">
          End Emergency?
        </h2>

        <p className="mt-3">
          Are you sure you're safe now?
        </p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border py-3"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 py-3 text-white"
          >
            Yes
          </button>

        </div>

      </div>

    </div>
  );
}