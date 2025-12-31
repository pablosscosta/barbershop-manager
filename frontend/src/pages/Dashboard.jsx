import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "24px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout}>Sair</button>
      </header>

      <main style={{ marginTop: "16px" }}>
        <p>Conteúdo da sua dashboard...</p>
      </main>
    </div>
  );
}

export default Dashboard;
