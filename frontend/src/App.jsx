import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import PieAnalytics from "./components/PieAnalytics";

function App() {
  const [incidents, setIncidents] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await api.get("/incidents/");
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
    (sum, incident) =>
      sum + (incident.occurrence_count || 0),
    0
  );

  const [severityData, setSeverityData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  fetchSeverityAnalytics();
  fetchStatusAnalytics();

  const fetchSeverityAnalytics = async () => {
  try {
    const response = await api.get(
      "/analytics/severity"
    );

    const chartData = Object.entries(
      response.data
    ).map(([name, value]) => ({
      name,
      value,
    }));

    setSeverityData(chartData);
  } catch (error) {
    console.error(error);
  }
};

const fetchStatusAnalytics = async () => {
  try {
    const response = await api.get(
      "/analytics/status"
    );

    const chartData = Object.entries(
      response.data
    ).map(([name, value]) => ({
      name,
      value,
    }));

    setStatusData(chartData);
  } catch (error) {
    console.error(error);
  }
};



  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f172a",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "30px",
          }}
        >
          Enterprise AI Operations Copilot
        </h1>

        {/* KPI Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <StatCard
            title="Total Incidents"
            value={incidents.length}
          />

          <StatCard
            title="Critical Incidents"
            value={criticalCount}
          />

          <StatCard
            title="Total Alerts"
            value={totalOccurrences}
          />

          <StatCard
            title="AI Enabled"
            value="✓"
          />
        </div>

        {/* Main Content */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "25px",
          }}
        >

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
              "repeat(2,1fr)",
              gap: "20px",
              marginBottom: "30px",
              }}
              >
                <PieAnalytics
    title="Severity Distribution"
    data={severityData}
  />

  <PieAnalytics
    title="Status Distribution"
    data={statusData}
  />
</div>
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
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h2>
                      {incident.title}
                    </h2>

                    <p>
                      Category:{" "}
                      {incident.category}
                    </p>

                    <p>
                      Occurrences:{" "}
                      {
                        incident.occurrence_count
                      }
                    </p>

                    <p>
                      Status:{" "}
                      {incident.status}
                    </p>
                  </div>

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
                      fontWeight: "bold",
                    }}
                  >
                    {incident.severity}
                  </span>
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
                    {analysis.recommended_actions?.map(
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
    </div>
  );
}

export default App;