import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#8b5cf6",
];

function SeverityDonut({ data }) {
  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div
      style={{
        height: "380px",
        width: "100%",
      }}
    >
      <ResponsiveContainer
        width="100%"
        height="80%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={110}
            paddingAngle={4}
          >
            {data.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip
            contentStyle={{
              background:
                "#0f172a",
              border:
                "1px solid rgba(139,92,246,.4)",
              borderRadius:
                "12px",
              color: "white",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div
        style={{
          marginTop: "-40px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            margin: 0,
            fontSize: "32px",
          }}
        >
          {total}
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "4px",
          }}
        >
          Total Incidents
        </p>
      </div>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        {data.map(
          (item, index) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                marginBottom:
                  "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius:
                      "50%",
                    background:
                      COLORS[
                        index %
                          COLORS.length
                      ],
                  }}
                />

                <span
                  style={{
                    color:
                      "#cbd5e1",
                  }}
                >
                  {item.name}
                </span>
              </div>

              <span
                style={{
                  color: "white",
                  fontWeight:
                    "600",
                }}
              >
                {item.value}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SeverityDonut;