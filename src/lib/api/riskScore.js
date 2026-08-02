const mockRiskResponse = {
  status: "success",
  message: "Risk score retrieved successfully",
  data: {
    location: "Selected Destination",
    risk_score: 28,
    risk_category: "Medium",
    timestamp: "2026-07-31T12:00:00+07:00",
    insights: {
      lighting: "Good",
      crowd_density: "Moderate",
      incident_history: "Low",
    },
  },
};

export async function getRiskScore() {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return mockRiskResponse;
}