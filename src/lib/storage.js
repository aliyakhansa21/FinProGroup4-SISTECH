// src/lib/storage.js

const CONTACTS_KEY = "sos_trusted_contacts";

export const getStoredContacts = (defaultContacts) => {
  if (typeof window === "undefined") return defaultContacts;
  try {
    const saved = localStorage.getItem(CONTACTS_KEY);
    return saved ? JSON.parse(saved) : defaultContacts;
  } catch (e) {
    console.error("Error reading contacts from localStorage", e);
    return defaultContacts;
  }
};

export const saveStoredContacts = (contacts) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  } catch (e) {
    console.error("Error saving contacts to localStorage", e);
  }
};
