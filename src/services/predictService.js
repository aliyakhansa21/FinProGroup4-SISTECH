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
    return result; // Mengembalikan object result utuh, bisa diakses result.data.risk_score
  } catch (error) {
    console.error("Gagal mengambil data prediksi MLOps:", error);
    throw error;
  }
}
