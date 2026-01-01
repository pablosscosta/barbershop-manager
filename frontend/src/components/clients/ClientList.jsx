import { deleteClient, updateClient } from "../../services/api";
import { useState } from "react";

function ClientList({ clients, setClients }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Erro ao deletar cliente");
    }
  };

  const handleEdit = (client) => {
    setEditingId(client.id);
    setEditData({ name: client.name, email: client.email, phone: client.phone });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await updateClient(id, editData);
      setClients((prev) =>
        prev.map((c) => (c.id === id ? res.data : c))
      );
      setEditingId(null);
    } catch (err) {
      alert("Erro ao atualizar cliente");
    }
  };

  return (
    <div>
      {clients.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              {editingId === client.id ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                  />
                  <button onClick={() => handleUpdate(client.id)}>Salvar</button>
                  <button onClick={() => setEditingId(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  {client.name} | {client.email} | {client.phone}
                  <button onClick={() => handleEdit(client)}>Editar</button>
                  <button onClick={() => handleDelete(client.id)}>Deletar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientList;
