import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

function TrendChart({ data }) {
  return (
    <div
      style={{
        height: "380px",
        width: "100%",
      }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="trendGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#8b5cf6"
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor="#8b5cf6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#1e293b"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="date"
            tick={{
              fill: "#94a3b8",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: "#94a3b8",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border:
                "1px solid rgba(139,92,246,.4)",
              borderRadius: "12px",
              color: "white",
            }}
          />

          <Area
            type="monotone"
            dataKey="count"
            stroke="none"
            fill="url(#trendGradient)"
          />

          <Line
            type="monotone"
            dataKey="count"
            stroke="#8b5cf6"
            strokeWidth={4}
            dot={{
              fill: "#8b5cf6",
              r: 5,
            }}
            activeDot={{
              r: 8,
              fill: "#ffffff",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendChart;