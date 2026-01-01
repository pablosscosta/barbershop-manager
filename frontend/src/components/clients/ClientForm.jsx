import { useState } from "react";
import { createClient } from "../../services/api";

function ClientForm({ onClientCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createClient({ name, email, phone });
      alert("Cliente criado com sucesso!");
      setName("");
      setEmail("");
      setPhone("");
      if (onClientCreated) {
        onClientCreated(res.data); // callback para atualizar lista
      }
    } catch (err) {
      alert("Erro ao criar cliente");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Telefone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button type="submit">Adicionar Cliente</button>
    </form>
  );
}

export default ClientForm;
