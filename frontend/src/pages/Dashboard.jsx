import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
        <nav style={{ marginTop: "16px" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/clients">Clientes</Link></li>
            <li><Link to="/barbers">Barbeiros</Link></li>
            <li><Link to="/services">Serviços</Link></li>
            <li><Link to="/appointments">Agendamentos</Link></li>
          </ul>
        </nav>
      </main>
    </div>
  );
}

export default Dashboard;
