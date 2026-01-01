import { deleteBarber, updateBarber } from "../../services/api";
import { useState } from "react";

function BarberList({ barbers, setBarbers }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", is_active: true });

  const handleDelete = async (id) => {
    try {
      await deleteBarber(id);
      setBarbers((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("Erro ao deletar barbeiro");
    }
  };

  const handleEdit = (barber) => {
    setEditingId(barber.id);
    setEditData({ name: barber.name, is_active: barber.is_active });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await updateBarber(id, editData);
      setBarbers((prev) =>
        prev.map((b) => (b.id === id ? res.data : b))
      );
      setEditingId(null);
    } catch (err) {
      alert("Erro ao atualizar barbeiro");
    }
  };

  return (
    <div>
      {barbers.length === 0 ? (
        <p>Nenhum barbeiro cadastrado.</p>
      ) : (
        <ul>
          {barbers.map((barber) => (
            <li key={barber.id}>
              {editingId === barber.id ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                  <label>
                    Ativo:
                    <input
                      type="checkbox"
                      checked={editData.is_active}
                      onChange={(e) =>
                        setEditData({ ...editData, is_active: e.target.checked })
                      }
                    />
                  </label>
                  <button onClick={() => handleUpdate(barber.id)}>Salvar</button>
                  <button onClick={() => setEditingId(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  {barber.name} | {barber.is_active ? "Ativo" : "Inativo"}
                  <button onClick={() => handleEdit(barber)}>Editar</button>
                  <button onClick={() => handleDelete(barber.id)}>Deletar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BarberList;
