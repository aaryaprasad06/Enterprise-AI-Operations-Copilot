import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from "recharts";

function SeverityChart({ data }) {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
      >
        <Cell fill="#ef4444" />
        <Cell fill="#f59e0b" />
        <Cell fill="#3b82f6" />
      </Pie>

      <Tooltip />
    </PieChart>
  );
}

export default SeverityChart;