import { deleteService, updateService } from "../../services/api";
import { useState } from "react";

function ServiceList({ services, setServices }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    duration_minutes: "",
    price: "",
    description: "",
  });

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert("Erro ao deletar serviço");
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setEditData({
      name: service.name,
      duration_minutes: service.duration_minutes,
      price: service.price,
      description: service.description || "",
    });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await updateService(id, editData);
      setServices((prev) =>
        prev.map((s) => (s.id === id ? res.data : s))
      );
      setEditingId(null);
    } catch (err) {
      alert("Erro ao atualizar serviço");
    }
  };

  return (
    <div>
      {services.length === 0 ? (
        <p>Nenhum serviço cadastrado.</p>
      ) : (
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              {editingId === service.id ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    value={editData.duration_minutes}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        duration_minutes: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={editData.price}
                    onChange={(e) =>
                      setEditData({ ...editData, price: e.target.value })
                    }
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                  <button onClick={() => handleUpdate(service.id)}>Salvar</button>
                  <button onClick={() => setEditingId(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  {service.name} | {service.duration_minutes} min | R$ {service.price}  
                  {service.description && ` | ${service.description}`}
                  <button onClick={() => handleEdit(service)}>Editar</button>
                  <button onClick={() => handleDelete(service.id)}>Deletar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ServiceList;
