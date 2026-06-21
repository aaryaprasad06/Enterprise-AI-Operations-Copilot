function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#020617",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>🚀 AIOps</h2>

      <div style={{ marginTop: "40px" }}>
        <p>Dashboard</p>
        <p>Incidents</p>
        <p>Copilot</p>
        <p>Executive Summary</p>
      </div>
    </div>
  );
}

export default Sidebar;