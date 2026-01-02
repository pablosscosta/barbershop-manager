import { useState } from "react";
import { createBarber } from "../../services/api";

function BarberForm({ onBarberCreated }) {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createBarber({ name, is_active: isActive });
      alert("Barbeiro criado com sucesso!");
      setName("");
      setIsActive(true);
      if (onBarberCreated) {
        onBarberCreated(res.data); // callback para atualizar lista
      }
    } catch (err) {
      alert("Erro ao criar barbeiro");
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
        <label>Ativo:</label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
      </div>
      <button type="submit">Adicionar Barbeiro</button>
    </form>
  );
}

export default BarberForm;