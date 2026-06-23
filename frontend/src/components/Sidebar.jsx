import {
  LayoutDashboard,
  AlertTriangle,
  Brain,
  FileText,
} from "lucide-react";

import { Link } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    path: "/",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Incidents",
    path: "/incidents",
    icon: <AlertTriangle size={20} />,
  },
  {
    title: "AI Copilot",
    path: "/copilot",
    icon: <Brain size={20} />,
  },
  {
    title: "Executive",
    path: "/executive",
    icon: <FileText size={20} />,
  },
];

function Sidebar() {
  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background:
          "linear-gradient(180deg,#020617,#0f172a)",
        borderRight:
          "1px solid rgba(139,92,246,.15)",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          marginBottom: "50px",
        }}
      >
        <h2
          style={{
            color: "white",
            marginBottom: "6px",
          }}
        >
          Enterprise AI
        </h2>

        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Operations Copilot
        </p>
      </div>

      {menu.map((item) => (
        <Link
          key={item.title}
          to={item.path}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: "#cbd5e1",
            padding: "14px",
            marginBottom: "10px",
            borderRadius: "14px",
            background:
              "rgba(255,255,255,.03)",
          }}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;