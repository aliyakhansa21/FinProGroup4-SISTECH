// src/lib/sirenAudio.js

let audioCtx = null;
let oscillator = null;
let isPlaying = false;
let sirenInterval = null;

export function playSirenSound() {
  if (isPlaying) return;
  isPlaying = true;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  audioCtx = new AudioContext();
  oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "sine";
  gainNode.gain.value = 0.3; // Volume suara sirine

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  let highPitch = false;
  oscillator.frequency.value = 600;

  // Efek nada sirine naik-turun (600Hz - 1200Hz)
  sirenInterval = setInterval(() => {
    if (oscillator && audioCtx) {
      oscillator.frequency.setValueAtTime(
        highPitch ? 600 : 1200,
        audioCtx.currentTime
      );
      highPitch = !highPitch;
    }
  }, 400);

  oscillator.start();
}

export function stopSirenSound() {
  if (sirenInterval) clearInterval(sirenInterval);
  if (oscillator) {
    try {
      oscillator.stop();
      oscillator.disconnect();
    } catch (e) {}
    oscillator = null;
  }
  if (audioCtx) {
    try {
      audioCtx.close();
    } catch (e) {}
    audioCtx = null;
  }
  isPlaying = false;
}