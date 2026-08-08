// src/services/predictService.js

/**
 * Memanggil API Predict MLOps untuk mendapatkan risk score.
 * @param {Object} data - Data lokasi dan waktu
 * @param {number} data.latitude - Latitude lokasi
 * @param {string} data.location - Nama jalan / lokasi
 * @param {number} data.longitude - Longitude lokasi
 * @param {string} data.timestamp - Waktu kejadian dalam format ISO (contoh: "2026-07-28T14:30:00+07:00")
 * @returns {Promise<Object>} Response dari API
 */
// --- Prediction API Call ---
export async function predictRisk(data) {
  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: data.latitude,
        location: data.location,
        longitude: data.longitude,
        timestamp: data.timestamp,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Gagal mengambil data prediksi MLOps:", error);
    throw error;
  }
}

// --- Route Evaluation ---
export async function getRouteRiskPrediction(routeCoordinates) {
  try {
    const midIndex = Math.floor(routeCoordinates.length / 2);
    const [midLon, midLat] = routeCoordinates[midIndex] || [106.8456, -6.2088];

    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        latitude: midLat,
        longitude: midLon,
        location: "Route Midpoint",
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error("Prediction failed");

    const result = await response.json();
    const score = result.data?.risk_score ?? Math.floor(Math.random() * 40 + 50);

    let safetyStatus = "Risky";
    let tags = ["High crime area", "Poorly lit"];

    if (score >= 80) {
      safetyStatus = "Safe";
      tags = ["Well-lit", "Cameras nearby", "Crowded area"];
    } else if (score >= 60) {
      safetyStatus = "Moderate";
      tags = ["Police station nearby", "Adequate lighting"];
    }

    return {
      riskScore: score,
      safetyStatus,
      tags
    };
  } catch (error) {
    console.error(error);
    return {
      riskScore: 75,
      safetyStatus: "Moderate",
      tags: ["Standard route", "Adequate lighting"]
    };
  }
}
