import { TrendingUp } from "lucide-react";

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = "#8b5cf6",
}) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(145deg,#0b1220,#111827)",
        border: `1px solid ${color}30`,
        borderRadius: "24px",
        padding: "24px",
        boxShadow: `0 10px 40px ${color}20`,
        transition: "all .3s ease",
      }}
    >
      {/* Glow */}

      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: `${color}20`,
          filter: "blur(50px)",
        }}
      />

      {/* Top Row */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "14px",
              margin: 0,
            }}
          >
            {title}
          </p>
        </div>

        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: `${color}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Value */}

      <h1
        style={{
          color: "white",
          fontSize: "42px",
          marginTop: "25px",
          marginBottom: "10px",
          fontWeight: "700",
        }}
      >
        {value}
      </h1>

      {/* Footer */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          {subtitle}
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: "#22c55e",
            fontSize: "13px",
          }}
        >
          <TrendingUp size={14} />
          Live
        </div>
      </div>
    </div>
  );
}

export default StatCard;