// Nominatim (OpenStreetMap) for Geocoding
export const geocode = async (address) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address
      )}&format=json&limit=1`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        displayName: data[0].display_name,
      };
    }
    return null;
  } catch (error) {
    console.error("Geocoding failed:", error);
    return null;
  }
};

// OSRM for Routing
export const getRoute = async (startLon, startLat, endLon, endLat) => {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`
    );
    const data = await response.json();
    if (data && data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      // OSRM returns coordinates as [lon, lat], Leaflet needs [lat, lon]
      const coordinates = route.geometry.coordinates.map((coord) => [
        coord[1],
        coord[0],
      ]);
      return {
        coordinates,
        distance: route.distance, // in meters
        duration: route.duration, // in seconds
      };
    }
    return null;
  } catch (error) {
    console.error("Routing failed:", error);
    return null;
  }
};
