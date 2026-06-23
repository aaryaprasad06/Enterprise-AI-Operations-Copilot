import { useEffect, useState } from "react";
import api from "../services/api";

function Incidents() {
  const [incidents, setIncidents] =
    useState([]);

  useEffect(() => {
    api
      .get("/incidents/")
      .then((res) =>
        setIncidents(res.data)
      );
  }, []);

  const getSeverityColor = (
    severity
  ) => {
    switch (severity) {
      case "CRITICAL":
        return "#ef4444";

      case "HIGH":
        return "#f97316";

      case "MEDIUM":
        return "#eab308";

      default:
        return "#22c55e";
    }
  };

  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "OPEN":
        return "#ef4444";

      case "RESOLVED":
        return "#22c55e";

      default:
        return "#f59e0b";
    }
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "34px",
            marginBottom: "8px",
          }}
        >
          Incident Management
        </h1>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Monitor and manage
          incidents across your
          platform.
        </p>
      </div>

      {/* STATS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#111827)",
            padding: "25px",
            borderRadius: "20px",
            border:
              "1px solid rgba(139,92,246,.2)",
          }}
        >
          <h3
            style={{
              color: "#94a3b8",
            }}
          >
            Total Incidents
          </h3>

          <h1
            style={{
              color: "white",
              fontSize: "40px",
            }}
          >
            {incidents.length}
          </h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#111827)",
            padding: "25px",
            borderRadius: "20px",
            border:
              "1px solid rgba(239,68,68,.2)",
          }}
        >
          <h3
            style={{
              color: "#94a3b8",
            }}
          >
            Critical
          </h3>

          <h1
            style={{
              color: "#ef4444",
              fontSize: "40px",
            }}
          >
            {
              incidents.filter(
                (i) =>
                  i.severity ===
                  "CRITICAL"
              ).length
            }
          </h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#111827)",
            padding: "25px",
            borderRadius: "20px",
            border:
              "1px solid rgba(34,197,94,.2)",
          }}
        >
          <h3
            style={{
              color: "#94a3b8",
            }}
          >
            Resolved
          </h3>

          <h1
            style={{
              color: "#22c55e",
              fontSize: "40px",
            }}
          >
            {
              incidents.filter(
                (i) =>
                  i.status ===
                  "RESOLVED"
              ).length
            }
          </h1>
        </div>
      </div>

      {/* TABLE */}

      <div
        style={{
          background:
            "rgba(15,23,42,.95)",
          borderRadius: "24px",
          padding: "25px",
          border:
            "1px solid rgba(139,92,246,.2)",
          boxShadow:
            "0 10px 40px rgba(0,0,0,.35)",
        }}
      >
        <h2
          style={{
            color: "white",
            marginBottom: "20px",
          }}
        >
          Incident List
        </h2>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom:
                    "1px solid #334155",
                }}
              >
                <th
                  style={{
                    color:
                      "#94a3b8",
                    textAlign:
                      "left",
                    padding:
                      "15px",
                  }}
                >
                  ID
                </th>

                <th
                  style={{
                    color:
                      "#94a3b8",
                    textAlign:
                      "left",
                    padding:
                      "15px",
                  }}
                >
                  Title
                </th>

                <th
                  style={{
                    color:
                      "#94a3b8",
                    textAlign:
                      "left",
                    padding:
                      "15px",
                  }}
                >
                  Severity
                </th>

                <th
                  style={{
                    color:
                      "#94a3b8",
                    textAlign:
                      "left",
                    padding:
                      "15px",
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {incidents.map(
                (incident) => (
                  <tr
                    key={
                      incident.id
                    }
                    style={{
                      borderBottom:
                        "1px solid #1e293b",
                    }}
                  >
                    <td
                      style={{
                        padding:
                          "18px",
                        color:
                          "#cbd5e1",
                      }}
                    >
                      #
                      {
                        incident.id
                      }
                    </td>

                    <td
                      style={{
                        padding:
                          "18px",
                        color:
                          "white",
                        fontWeight:
                          "500",
                      }}
                    >
                      {
                        incident.title
                      }
                    </td>

                    <td
                      style={{
                        padding:
                          "18px",
                      }}
                    >
                      <span
                        style={{
                          background: `${getSeverityColor(
                            incident.severity
                          )}20`,
                          color:
                            getSeverityColor(
                              incident.severity
                            ),
                          padding:
                            "8px 14px",
                          borderRadius:
                            "999px",
                          fontWeight:
                            "600",
                        }}
                      >
                        {
                          incident.severity
                        }
                      </span>
                    </td>

                    <td
                      style={{
                        padding:
                          "18px",
                      }}
                    >
                      <span
                        style={{
                          background: `${getStatusColor(
                            incident.status
                          )}20`,
                          color:
                            getStatusColor(
                              incident.status
                            ),
                          padding:
                            "8px 14px",
                          borderRadius:
                            "999px",
                          fontWeight:
                            "600",
                        }}
                      >
                        {
                          incident.status
                        }
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Incidents;