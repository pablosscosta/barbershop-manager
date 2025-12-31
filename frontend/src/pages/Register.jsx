import { useState } from "react";
import { register } from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, password).then(res => console.log(res.data));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
