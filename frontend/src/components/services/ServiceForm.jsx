import { useState } from "react";
import { createService } from "../../services/api";

function ServiceForm({ onServiceCreated }) {
  const [name, setName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createService({
        name,
        duration_minutes: durationMinutes,
        price,
        description,
      });
      alert("Serviço criado com sucesso!");
      setName("");
      setDurationMinutes("");
      setPrice("");
      setDescription("");
      if (onServiceCreated) {
        onServiceCreated(res.data); // callback para atualizar lista
      }
    } catch (err) {
      alert("Erro ao criar serviço");
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
        <label>Duração (minutos):</label>
        <input
          type="number"
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Preço:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Adicionar Serviço</button>
    </form>
  );
}

export default ServiceForm;
