export const STORAGE_KEY = "activeSharelock";
export const MAX_PIN_ATTEMPTS = 3;
export const GRACE_PERIOD_MINUTES = 2;
export const SHARELOCK_UPDATE_EVENT = "sharelock:update";

export function generateToken(seed) {
    if (typeof window === "undefined") return "";
    return btoa(seed).replace(/=+$/g, "");
}

export function readSession() {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function writeSession(session) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    window.dispatchEvent(new Event(SHARELOCK_UPDATE_EVENT));
}

export function clearSession() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(SHARELOCK_UPDATE_EVENT));
}

export function createSession(params) {
    const id = `share-${Date.now()}`;
    const session = {
        id,
        token: generateToken(id),
        durationMinutes: params.durationMinutes,
        startTime: new Date().toISOString(),
        pin: params.pin,
        status: "active",
        graceExtensionsUsed: 0,
        contactName: params.contactName ?? "Dad",
        contactPhone: params.contactPhone ?? "+1 (555) 030-4040",
    };
    writeSession(session);
    return session;
}