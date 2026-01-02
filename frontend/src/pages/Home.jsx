import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Barbershop Manager</h1>
      <p>Frontend está rodando 🚀</p>
      <nav style={{ marginTop: "16px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <a href="/login">
            <button>Login</button>
          </a>
          <a href="/register">
            <button>Cadastro</button>
          </a> 
        </ul>
      </nav>
    </div>
  );
}

export default Home;
