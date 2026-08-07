"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mockData from "@/data/mockHeatmapData.json"; 

export default function HeatmapView({ activeFilter = "All", isBackground = false }) {
    const defaultCenter = [41.8781, -87.6298]; 
    const [combinedData, setCombinedData] = useState(mockData);

    useEffect(() => {
        const local = localStorage.getItem("localReports");
        if (local) {
            try {
                const localReports = JSON.parse(local);
                if (Array.isArray(localReports) && localReports.length > 0) {
                    setCombinedData([...mockData, ...localReports]);
                }
            } catch (err) {
                console.error("Failed to parse localReports", err);
            }
        }
    }, []);

    const filteredData = combinedData.filter(data => {
        if (activeFilter === "All") return true;
        return data.risk_category === activeFilter;
    });

    const getRiskColor = (category) => {
        switch (category) {
            case "Low": return "#22c55e"; 
            case "Medium": return "#eab308"; 
            case "High": return "#f97316"; 
            case "Very High": return "#ef4444"; 
            default: return "#94a3b8"; 
        }
    };

    return (
        <div className="relative w-full h-full z-0">
            {isBackground && (
                <style>{`
                    .leaflet-control-attribution { display: none !important; }
                `}</style>
            )}
            
            <MapContainer 
                key={isBackground ? "bg-map-v2" : "main-map-v2"}
                center={defaultCenter} 
                zoom={14} 
                style={{ height: "100%", width: "100%" }}
                zoomControl={!isBackground}
                scrollWheelZoom={!isBackground}
                dragging={!isBackground}
                doubleClickZoom={!isBackground}
                attributionControl={true}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution={isBackground ? "" : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'}
                />

                {filteredData.map((data) => (
                    <CircleMarker
                        key={data.id}
                        center={[data.latitude, data.longitude]}
                        radius={data.risk_score / 2.5}
                        pathOptions={{
                            fillColor: getRiskColor(data.risk_category),
                            fillOpacity: 0.5,
                            color: getRiskColor(data.risk_category),
                            weight: 0
                        }}
                    >
                        {!isBackground ? (
                            <Popup>
                                <div className="p-1">
                                    <h3 className="font-bold text-gray-800">
                                        {data.incidentType ? `${data.incidentType} (User Report)` : `${data.risk_category} Risk Zone`}
                                    </h3>
                                    <p className="text-sm font-semibold text-gray-600 mt-1">Score: {data.risk_score}/100</p>
                                    <p className="text-xs text-gray-500 mt-2">{data.description || "No description provided."}</p>
                                    <p className="text-[10px] text-gray-400 mt-2">{new Date(data.timestamp).toLocaleString()}</p>
                                </div>
                            </Popup>
                        ) : null}
                    </CircleMarker>
                ))}
            </MapContainer>

            {/* Figma Legend Layout */}
            {!isBackground && (
                <div className="absolute bottom-6 right-4 md:left-auto md:right-6 z-[400] bg-white/95 backdrop-blur-md px-5 py-4 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 flex flex-col gap-3 min-w-[140px]">
                    <h4 className="text-[13px] font-bold text-gray-900">Risk Level</h4>
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-3">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#ef4444] shadow-sm"></span>
                            <span className="text-xs font-semibold text-gray-700">Very High</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#f97316] shadow-sm"></span>
                            <span className="text-xs font-semibold text-gray-700">High</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#eab308] shadow-sm"></span>
                            <span className="text-xs font-semibold text-gray-700">Medium</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#22c55e] shadow-sm"></span>
                            <span className="text-xs font-semibold text-gray-700">Low</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}