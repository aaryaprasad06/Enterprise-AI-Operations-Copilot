import { useEffect, useState } from "react";
import api from "../services/api";

import StatCard from "../components/StatCard";
import TrendChart from "../components/TrendChart";
import SeverityDonut from "../components/SeverityDonut";
import IncidentTable from "../components/IncidentTable";

import {
  AlertTriangle,
  ShieldAlert,
  Timer,
  HeartPulse,
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [severity, setSeverity] = useState([]);
  const [trends, setTrends] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [healthScore, setHealthScore] = useState(0);
  const [mttr, setMttr] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        statsRes,
        severityRes,
        trendRes,
        incidentRes,
        healthRes,
        mttrRes,
      ] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/dashboard/severity"),
        api.get("/dashboard/trends"),
        api.get("/incidents"),
        api.get("/dashboard/health-score"),
        api.get("/dashboard/mttr"),
      ]);

      setStats(statsRes.data);

      setSeverity(
        Object.entries(severityRes.data).map(
          ([key, value]) => ({
            name: key,
            value,
          })
        )
      );

      setTrends(
        Object.entries(trendRes.data).map(
          ([date, count]) => ({
            date,
            count,
          })
        )
      );

      setIncidents(incidentRes.data);

      setHealthScore(
        healthRes.data.score
      );

      setMttr(
        mttrRes.data.mttr_hours
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Header */}

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "36px",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          Operations Dashboard
        </h1>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Real-time AI-powered incident monitoring
          and operational intelligence.
        </p>
      </div>

      {/* KPI Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <StatCard
          title="Total Incidents"
          value={
            stats.total_incidents || 0
          }
          subtitle="All incidents"
          icon={
            <AlertTriangle size={24} />
          }
          color="#8b5cf6"
        />

        <StatCard
          title="Critical"
          value={
            stats.critical_incidents || 0
          }
          subtitle="High priority incidents"
          icon={
            <ShieldAlert size={24} />
          }
          color="#ef4444"
        />

        <StatCard
          title="MTTR"
          value={`${mttr || 0}h`}
          subtitle="Mean Time To Resolution"
          icon={<Timer size={24} />}
          color="#f59e0b"
        />

        <StatCard
          title="Health Score"
          value={`${healthScore}%`}
          subtitle="Platform Health"
          icon={
            <HeartPulse size={24} />
          }
          color="#22c55e"
        />
      </div>

      {/* Main Analytics */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "2fr 1fr",
          gap: "24px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(145deg,#081225,#0f172a)",
            border:
              "1px solid rgba(139,92,246,.2)",
            borderRadius: "24px",
            padding: "24px",
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "20px",
            }}
          >
            Incident Trends
          </h2>

          <TrendChart
            data={trends}
          />
        </div>

        <div
          style={{
            background:
              "linear-gradient(145deg,#081225,#0f172a)",
            border:
              "1px solid rgba(139,92,246,.2)",
            borderRadius: "24px",
            padding: "24px",
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "20px",
            }}
          >
            Severity Distribution
          </h2>

          <SeverityDonut
            data={severity}
          />
        </div>
      </div>

      {/* Secondary KPI Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(145deg,#0f172a,#111827)",
            border:
              "1px solid rgba(139,92,246,.2)",
            borderRadius: "20px",
            padding: "24px",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Total Alerts
          </p>

          <h1
            style={{
              color: "white",
              marginTop: "10px",
            }}
          >
            {
              stats.total_occurrences
            }
          </h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(145deg,#0f172a,#111827)",
            border:
              "1px solid rgba(239,68,68,.2)",
            borderRadius: "20px",
            padding: "24px",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Database Incidents
          </p>

          <h1
            style={{
              color: "white",
              marginTop: "10px",
            }}
          >
            {
              stats.database_incidents
            }
          </h1>
        </div>

        <div
          style={{
            background:
              "linear-gradient(145deg,#0f172a,#111827)",
            border:
              "1px solid rgba(34,197,94,.2)",
            borderRadius: "20px",
            padding: "24px",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Infrastructure Incidents
          </p>

          <h1
            style={{
              color: "white",
              marginTop: "10px",
            }}
          >
            {
              stats.infrastructure_incidents
            }
          </h1>
        </div>
      </div>

      {/* Incident Table */}

      <div
        style={{
          background:
            "linear-gradient(145deg,#081225,#0f172a)",
          border:
            "1px solid rgba(139,92,246,.2)",
          borderRadius: "24px",
          padding: "24px",
        }}
      >
        <h2
          style={{
            color: "white",
            marginBottom: "20px",
          }}
        >
          Recent Incidents
        </h2>

        <IncidentTable
          incidents={incidents}
        />
      </div>
    </div>
  );
}

export default Dashboard;