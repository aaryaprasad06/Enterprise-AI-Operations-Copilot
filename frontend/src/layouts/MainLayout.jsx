import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        background:
          "linear-gradient(180deg,#020617,#0f172a)",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          width: "100%",
          padding: "30px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default MainLayout;