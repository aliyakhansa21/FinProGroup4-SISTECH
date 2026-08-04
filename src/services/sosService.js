// src/services/sosService.js

// Fungsi helper generate token acak misal: ABX921KD
export function generateSOSToken() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Simpan sesi SOS ke localStorage
export function createSOSSession(emergencyNote = "") {
  const token = generateSOSToken();
  const sessionData = {
    token,
    status: "SOS AKTIF",
    createdAt: new Date().toISOString(),
    location: {
      lat: -6.2088,
      lng: 106.8456,
      address: "Jl. Sudirman, Jakarta",
    },
    emergencyMessage: emergencyNote || "Saya telah mengaktifkan SOS. Harap pantau lokasi langsung saya.",
  };

  if (typeof window !== "undefined") {
    localStorage.setItem("active_sos_session", JSON.stringify(sessionData));
    localStorage.setItem(`sos_session_${token}`, JSON.stringify(sessionData));
  }

  return sessionData;
}

// Ambil sesi SOS berdasarkan token
export function getSOSSession(token) {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(`sos_session_${token}`);
  if (data) return JSON.parse(data);

  // Fallback ke active session
  const active = localStorage.getItem("active_sos_session");
  if (active) {
    const parsed = JSON.parse(active);
    if (parsed.token === token) return parsed;
  }
  return null;
}

// Picu Web Share API Native
export async function shareSOSLink(token, customNote = "") {
  if (typeof window === "undefined") return false;

  const shareUrl = `${window.location.origin}/share/${token}`;
  const messageText = `🚨 PERINGATAN DARURAT\n\nSaya telah mengaktifkan SOS. Harap pantau lokasi langsung saya.\n\n${customNote ? `Catatan: ${customNote}\n\n` : ""}Tautan Pelacakan: ${shareUrl}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "🚨 PERINGATAN DARURAT SOS",
        text: messageText,
        url: shareUrl,
      });
      return true;
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error sharing:", err);
      }
    }
  }

  // Fallback Copy to Clipboard jika navigator.share tidak tersedia
  try {
    await navigator.clipboard.writeText(messageText);
    alert("Tautan berbagi disalin ke clipboard.");
    return true;
  } catch (err) {
    console.error("Clipboard error:", err);
    return false;
  }
}