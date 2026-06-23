import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FileText,
  Sparkles,
  Activity,
  ShieldAlert,
} from "lucide-react";

function ExecutiveSummary() {
  const [summary, setSummary] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get(
        "/executive/summary"
      );

      setSummary(
        response.data.summary
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
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
          Executive Summary
        </h1>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          AI-generated leadership
          insights and platform
          health overview.
        </p>
      </div>

      {/* QUICK METRICS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#111827)",
            border:
              "1px solid rgba(139,92,246,.2)",
            borderRadius: "20px",
            padding: "25px",
          }}
        >
          <Activity
            size={28}
            color="#22c55e"
          />

          <h3
            style={{
              color: "#94a3b8",
            }}
          >
            Platform Status
          </h3>

          <h2
            style={{
              color: "white",
            }}
          >
            Operational
          </h2>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#111827)",
            border:
              "1px solid rgba(239,68,68,.2)",
            borderRadius: "20px",
            padding: "25px",
          }}
        >
          <ShieldAlert
            size={28}
            color="#ef4444"
          />

          <h3
            style={{
              color: "#94a3b8",
            }}
          >
            Risk Level
          </h3>

          <h2
            style={{
              color: "white",
            }}
          >
            Moderate
          </h2>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#111827)",
            border:
              "1px solid rgba(34,197,94,.2)",
            borderRadius: "20px",
            padding: "25px",
          }}
        >
          <Sparkles
            size={28}
            color="#8b5cf6"
          />

          <h3
            style={{
              color: "#94a3b8",
            }}
          >
            AI Insights
          </h3>

          <h2
            style={{
              color: "white",
            }}
          >
            Active
          </h2>
        </div>
      </div>

      {/* SUMMARY CARD */}

      <div
        style={{
          background:
            "rgba(15,23,42,.95)",
          border:
            "1px solid rgba(139,92,246,.25)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow:
            "0 10px 40px rgba(0,0,0,.35)",
        }}
      >
        {/* CARD HEADER */}

        <div
          style={{
            padding: "25px",
            borderBottom:
              "1px solid #1e293b",
            display: "flex",
            alignItems:
              "center",
            gap: "12px",
          }}
        >
          <FileText
            size={26}
            color="#8b5cf6"
          />

          <div>
            <h2
              style={{
                color: "white",
                margin: 0,
              }}
            >
              CIO Briefing
            </h2>

            <p
              style={{
                color: "#94a3b8",
                margin: 0,
                marginTop: "5px",
              }}
            >
              Executive-level
              incident analysis
            </p>
          </div>
        </div>

        {/* CONTENT */}

        <div
          style={{
            padding: "30px",
          }}
        >
          {loading ? (
            <div
              style={{
                textAlign:
                  "center",
                padding:
                  "40px 0",
              }}
            >
              <Sparkles
                size={50}
                color="#8b5cf6"
              />

              <h3
                style={{
                  color:
                    "white",
                  marginTop:
                    "20px",
                }}
              >
                Generating
                Executive Report...
              </h3>

              <p
                style={{
                  color:
                    "#94a3b8",
                }}
              >
                AI is analyzing
                platform incidents
              </p>
            </div>
          ) : (
            <div
              style={{
                color:
                  "#e2e8f0",
                lineHeight:
                  "2",
                fontSize:
                  "17px",
                whiteSpace:
                  "pre-wrap",
              }}
            >
              {summary}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExecutiveSummary;