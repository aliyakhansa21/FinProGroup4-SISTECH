"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Komponen untuk mendeteksi pergeseran peta
function MapEvents({ onLocationChange }) {
    const map = useMap();
    
    useEffect(() => {
        // Ambil titik tengah setiap kali peta selesai digeser
        map.on("moveend", () => {
            const center = map.getCenter();
            onLocationChange({ lat: center.lat, lng: center.lng });
        });
    }, [map, onLocationChange]);

    return null;
}

export default function MapPicker({ onLocationSelect }) {
    // Koordinat default Chicago (Lat: 41.8781, Lng: -87.6298)
    const defaultCenter = [41.8781, -87.6298];

    return (
        <div className="relative w-full h-full">
            <MapContainer 
                center={defaultCenter} 
                zoom={14} 
                style={{ height: "100%", width: "100%" }}
                zoomControl={false} // Sembunyikan tombol zoom 
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <MapEvents onLocationChange={onLocationSelect} />
            </MapContainer>

            {/* Pin Statis di Tengah Layar */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[400] pointer-events-none">
                <svg className="w-10 h-10 text-gray-900 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
            </div>
        </div>
    );
}