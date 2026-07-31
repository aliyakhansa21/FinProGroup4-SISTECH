"use client";

import { useState } from "react";
import RouteMap from "@/components/safe-route/RouteMap";
import { getRiskScore } from "@/lib/api/riskScore";

const recentSearches = [
  "Home",
  "Campus",
  "Mall Taman Anggrek",
  "Pasar Baru",
];

export default function SafeRoutePage() {
const [step, setStep] = useState(1);
const [destination, setDestination] = useState("");
const [selectedRoute, setSelectedRoute] = useState(null);
const [riskResult, setRiskResult] = useState(null);
const [riskLoading, setRiskLoading] = useState(false);
const [riskError, setRiskError] = useState(null);

  const handleContinue = () => {
    if (!destination.trim()) return;

    setStep(2);
  };

  const handleRecentSearch = (place) => {
    setDestination(place);
  };

const recommendedRoutes = [
  {
    id: 1,
    name: "Safest Route",
    duration: "24 min",
    risk: "Low Risk",
    coordinates: [
      [41.8781, -87.6298],
      [41.8815, -87.625],
      [41.8845, -87.618],
      [41.889, -87.614],
    ],
  },
  {
    id: 2,
    name: "Balanced Route",
    duration: "20 min",
    risk: "Medium Risk",
    coordinates: [
      [41.8781, -87.6298],
      [41.88, -87.623],
      [41.885, -87.62],
      [41.89, -87.614],
    ],
  },
  {
    id: 3,
    name: "Fastest Route",
    duration: "17 min",
    risk: "High Risk",
    coordinates: [
      [41.8781, -87.6298],
      [41.883, -87.622],
      [41.888, -87.617],
      [41.892, -87.611],
    ],
  },
];

const handleGetRiskPrediction = async () => {
  setRiskLoading(true);
  setRiskError(null);

  try {
    const response = await getRiskScore();

    if (response.status !== "success") {
      throw new Error(response.message);
    }

    setRiskResult(response.data);
    setStep(4);
  } catch (error) {
    setRiskError(error.message);
  } finally {
    setRiskLoading(false);
  }
};

  return (
    <div>
    {step === 1 && (
    <div className="min-h-full">
      <div className="mx-auto w-full max-w-3xl">
        <section className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Safe Route
            </h1>
          </div>

          {/* Main Question */}
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold leading-relaxed text-gray-900 sm:text-2xl">
              Where do you want to go?
            </h2>
          </div>

          {/* Destination Input */}
          <div className="mt-8">
            <label
              htmlFor="destination"
              className="sr-only"
            >
              Destination
            </label>

            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Enter your destination"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Recent Searches */}
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Recent Searches
            </h3>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              {recentSearches.map((place, index) => (
                <button
                  key={place}
                  type="button"
                  onClick={() => handleRecentSearch(place)}
                  className={`flex w-full items-center px-4 py-3 text-left text-sm font-medium text-gray-800 transition hover:bg-gray-50 ${
                    index !== recentSearches.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  {place}
                </button>
              ))}
            </div>
          </div>

          {/* Continue */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!destination.trim()}
            className="mt-8 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Continue
          </button>
        </section>
      </div>
    </div>
    )}

{step === 2 && (
  <div className="mx-auto w-full max-w-3xl">
    <section className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-xl text-gray-500 transition hover:text-gray-900"
          aria-label="Back"
        >
          ←
        </button>

        <h1 className="text-lg font-semibold text-gray-900">
          Route Recommendation
        </h1>
      </div>

      {/* From */}
      <div className="mt-8">
        <p className="text-sm font-medium text-gray-500">
          From
        </p>

        <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900">
          Current Location
        </div>
      </div>

      {/* To */}
      <div className="mt-5">
        <p className="text-sm font-medium text-gray-500">
          To
        </p>

        <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900">
          {destination}
        </div>
      </div>

      {/* Recommended Routes */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-gray-900">
          Recommended Routes
        </h2>

        <div className="mt-3 space-y-3">
          {recommendedRoutes.map((route) => (
          <button
            key={route.id}
            type="button"
            onClick={() => setSelectedRoute(route)}
            className={`w-full rounded-xl border p-4 text-left transition ${
            selectedRoute?.id === route.id
            ? "border-gray-900 bg-gray-50 shadow-sm"
            : "border-gray-200 bg-white hover:border-gray-400"
            }`}
          >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">
                    {route.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {route.duration}
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {route.risk}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Continue */}
        <button
          type="button"
          disabled={!selectedRoute}
          onClick={() => setStep(3)}
          className="mt-8 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Continue
        </button>
    </section>
  </div>
)}

  {step === 3 && selectedRoute && (
  <div className="mx-auto w-full max-w-5xl">
    <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="text-xl text-gray-500 transition hover:text-gray-900"
          aria-label="Back"
        >
          ←
        </button>

        <h1 className="text-lg font-semibold text-gray-900">
          Route Recommendation
        </h1>
      </div>

      {/* Map */}
      <div className="mt-6">
        <RouteMap route={selectedRoute} />
      </div>

      {/* Route Summary */}
      <div className="mt-6 rounded-2xl border border-gray-200 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Selected Route
            </p>

            <h2 className="mt-1 text-xl font-semibold text-gray-900">
              {selectedRoute.name}
            </h2>
          </div>

          <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {selectedRoute.risk}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">
              Estimated Time
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {selectedRoute.duration}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">
              Destination
            </p>

            <p className="mt-1 truncate font-semibold text-gray-900">
              {destination}
            </p>
          </div>
        </div>
      </div>

      {riskError && (
        <p className="mt-4 rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700">
          {riskError}
        </p>
      )}

      {/* Continue */}
      <button
        type="button"
        onClick={handleGetRiskPrediction}
        disabled={riskLoading}
        className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {riskLoading ? "Checking Risk..." : "View Risk Prediction"}
      </button>
    </section>
  </div>
)}

  {step === 4 && riskResult && (
  <div className="mx-auto w-full max-w-3xl">
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setStep(3)}
          className="text-xl text-gray-500 transition hover:text-gray-900"
          aria-label="Back"
        >
          ←
        </button>

        <h1 className="text-lg font-semibold text-gray-900">
          Risk Prediction
        </h1>
      </div>

      {/* Risk Score */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-500">
          Current Risk Score
        </p>

        <p className="mt-2 text-5xl font-bold text-gray-900">
          {riskResult.risk_score}
        </p>

        <p className="mt-2 text-lg font-semibold text-gray-700">
          {riskResult.risk_category}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          {riskResult.location}
        </p>
      </div>

      {/* Safety Insights */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-900">
          Safety Insights
        </h2>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">
              Lighting
            </p>
            <p className="mt-1 font-semibold text-gray-900">
              {riskResult.insights.lighting}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">
              Crowd Density
            </p>
            <p className="mt-1 font-semibold text-gray-900">
              {riskResult.insights.crowd_density}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">
              Incident History
            </p>
            <p className="mt-1 font-semibold text-gray-900">
              {riskResult.insights.incident_history}
            </p>
          </div>
        </div>
      </div>

      {/* Route Information */}
      <div className="mt-6 rounded-2xl border border-gray-200 p-5">
        <p className="text-sm text-gray-500">
          Selected Route
        </p>

        <div className="mt-2 flex flex-col gap-1">
          <p className="font-semibold text-gray-900">
            {selectedRoute.name}
          </p>

          <p className="text-sm text-gray-500">
            Estimated travel time: {selectedRoute.duration}
          </p>

          <p className="text-sm text-gray-500">
            Destination: {destination}
          </p>
        </div>
      </div>

      {/* Continue */}
      <button
        type="button"
        onClick={() => setStep(5)}
        className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
      >
        View Risk on Map
      </button>
    </section>
  </div>
)}

{step === 5 && selectedRoute && riskResult && (
  <div className="mx-auto w-full max-w-6xl">
    <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setStep(4)}
          className="text-xl text-gray-500 transition hover:text-gray-900"
          aria-label="Back"
        >
          ←
        </button>

        <h1 className="text-lg font-semibold text-gray-900">
          Safe Route Result
        </h1>
      </div>

      {/* Main Content */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Map */}
        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <RouteMap route={selectedRoute} />
        </div>

        {/* Result */}
        <div className="space-y-5">
          {/* Route */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">
              Selected Route
            </p>

            <div className="mt-2 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedRoute.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedRoute.duration}
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                {selectedRoute.risk}
              </span>
            </div>
          </div>

          {/* Risk Score */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">
              Risk Score
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-4xl font-bold text-gray-900">
                {riskResult.risk_score}
              </span>

              <span className="pb-1 text-sm text-gray-500">
                / 100
              </span>
            </div>

            <p className="mt-1 text-sm font-medium text-gray-700">
              {riskResult.risk_category}
            </p>
          </div>

          {/* Safety Insights */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900">
              Safety Insights
            </h2>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-sm text-gray-500">
                  Lighting
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  {riskResult.insights.lighting}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-sm text-gray-500">
                  Crowd Density
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  {riskResult.insights.crowd_density}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Incident History
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  {riskResult.insights.incident_history}
                </span>
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-xs text-gray-500">
              Destination
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {destination}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
)}
    </div>
  );
}