import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [incidents, setIncidents] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await api.get("/incidents");
      setIncidents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const analyzeIncident = async (title) => {
    try {
      setLoading(true);

      const response = await api.post(
        `/analysis/?incident_text=${encodeURIComponent(
          title
        )}`
      );

      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const criticalCount = incidents.filter(
    (incident) => incident.severity === "CRITICAL"
  ).length;

  const totalOccurrences = incidents.reduce(
    (sum, incident) => sum + incident.occurrence_count,
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "48px",
          marginBottom: "30px",
        }}
      >
        Enterprise AI Operations Copilot
      </h1>

      {/* KPI Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Total Incidents</h3>
          <h1>{incidents.length}</h1>
        </div>

        <div
          style={{
            background: "#7f1d1d",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Critical Incidents</h3>
          <h1>{criticalCount}</h1>
        </div>

        <div
          style={{
            background: "#1e40af",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Total Alerts</h3>
          <h1>{totalOccurrences}</h1>
        </div>

        <div
          style={{
            background: "#166534",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>AI Enabled</h3>
          <h1>✓</h1>
        </div>
      </div>

      {/* Main Layout */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
        }}
      >
        {/* Incident List */}

        <div>
          {incidents.map((incident) => (
            <div
              key={incident.id}
              style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h2>{incident.title}</h2>

                  <p>
                    Category: {incident.category}
                  </p>

                  <p>
                    Occurrences:{" "}
                    {incident.occurrence_count}
                  </p>
                </div>

                <div>
                  <span
                    style={{
                      background:
                        incident.severity ===
                        "CRITICAL"
                          ? "#dc2626"
                          : "#f59e0b",
                      padding:
                        "8px 14px",
                      borderRadius:
                        "20px",
                    }}
                  >
                    {incident.severity}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  analyzeIncident(
                    incident.title
                  )
                }
                style={{
                  marginTop: "15px",
                  background:
                    "#7c3aed",
                  border: "none",
                  padding:
                    "10px 16px",
                  color: "white",
                  borderRadius:
                    "8px",
                  cursor: "pointer",
                }}
              >
                Analyze Incident
              </button>
            </div>
          ))}
        </div>

        {/* AI Analysis Panel */}

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            height: "fit-content",
            position: "sticky",
            top: "20px",
          }}
        >
          <h2>
            AI Root Cause Analysis
          </h2>

          {loading && (
            <p>Analyzing...</p>
          )}

          {!loading &&
            !analysis && (
              <p>
                Select an incident
                and click Analyze.
              </p>
            )}

          {!loading &&
            analysis && (
              <>
                <h3>
                  Root Cause
                </h3>

                <p>
                  {
                    analysis.root_cause
                  }
                </p>

                <h3>
                  Confidence
                </h3>

                <p>
                  {Math.round(
                    analysis.confidence *
                      100
                  )}
                  %
                </p>

                <h3>
                  Recommended
                  Actions
                </h3>

                <ul>
                  {analysis.recommended_actions.map(
                    (
                      action,
                      index
                    ) => (
                      <li
                        key={index}
                        style={{
                          marginBottom:
                            "10px",
                        }}
                      >
                        ✓ {action}
                      </li>
                    )
                  )}
                </ul>
              </>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;