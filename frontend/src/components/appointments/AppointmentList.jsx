import { deleteAppointment, updateAppointment, getBarbers, getServices, getClients } from "../../services/api";
import { useState, useEffect } from "react";

function AppointmentList({ appointments, setAppointments }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    barber_id: "",
    customer_id: "",
    service_id: "",
    date: "",
    time: "",
    status: "scheduled",
    price: "",
  });

  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [barbersRes, servicesRes, clientsRes] = await Promise.all([
          getBarbers(),
          getServices(),
          getClients(),
        ]);
        setBarbers(barbersRes.data);
        setServices(servicesRes.data);
        setClients(clientsRes.data);
      } catch (err) {
        alert("Erro ao carregar dados auxiliares");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert("Erro ao deletar agendamento");
    }
  };

  const handleEdit = (appointment) => {
    setEditingId(appointment.id);
    const dateObj = new Date(appointment.scheduled_time);
    const date = dateObj.toISOString().split("T")[0];
    const time = dateObj.toISOString().split("T")[1].slice(0, 5);

    setEditData({
      barber_id: appointment.barber?.id,
      customer_id: appointment.customer?.id,
      service_id: appointment.service?.id,
      date,
      time,
      status: appointment.status,
      price: appointment.price,
    });
  };

  const handleUpdate = async (id) => {
    try {
      const scheduledTime = `${editData.date}T${editData.time}:00`;
      const payload = {
        barber_id: editData.barber_id,
        customer_id: editData.customer_id,
        service_id: editData.service_id,
        scheduled_time: scheduledTime,
        status: editData.status,
        price: parseFloat(editData.price).toFixed(2),
      };

      const res = await updateAppointment(id, payload);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? res.data : a))
      );
      setEditingId(null);
    } catch (err) {
      alert("Erro ao atualizar agendamento");
    }
  };

  const formatDateTime = (isoString) => {
    const dateObj = new Date(isoString);
    dateObj.setHours(dateObj.getHours() + 3);
    const date = dateObj.toLocaleDateString("pt-BR");
    const time = dateObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} às ${time}`;
  };

  const statusMap = {
    scheduled: "Agendado",
    completed: "Concluído",
    canceled: "Cancelado",
  };

  return (
    <div>
      {appointments.length === 0 ? (
        <p>Nenhum agendamento cadastrado.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              {editingId === appointment.id ? (
                <>
                  <select
                    value={editData.barber_id}
                    onChange={(e) =>
                      setEditData({ ...editData, barber_id: parseInt(e.target.value) })
                    }
                  >
                    <option value="">Selecione Barbeiro</option>
                    {barbers.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>

                  <select
                    value={editData.customer_id}
                    onChange={(e) =>
                      setEditData({ ...editData, customer_id: parseInt(e.target.value) })
                    }
                  >
                    <option value="">Selecione Cliente</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>

                  <select
                    value={editData.service_id}
                    onChange={(e) =>
                      setEditData({ ...editData, service_id: parseInt(e.target.value) })
                    }
                  >
                    <option value="">Selecione Serviço</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>

                  <input
                    type="date"
                    value={editData.date}
                    onChange={(e) =>
                      setEditData({ ...editData, date: e.target.value })
                    }
                  />
                  <input
                    type="time"
                    value={editData.time}
                    onChange={(e) =>
                      setEditData({ ...editData, time: e.target.value })
                    }
                  />

                  <select
                    value={editData.status}
                    onChange={(e) =>
                      setEditData({ ...editData, status: e.target.value })
                    }
                  >
                    <option value="scheduled">Agendado</option>
                    <option value="completed">Concluído</option>
                    <option value="canceled">Cancelado</option>
                  </select>

                  <input
                    type="number"
                    step="0.01"
                    value={editData.price}
                    onChange={(e) =>
                      setEditData({ ...editData, price: e.target.value })
                    }
                  />

                  <button onClick={() => handleUpdate(appointment.id)}>Salvar</button>
                  <button onClick={() => setEditingId(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  {appointment.customer?.name} | {appointment.service?.name} | {appointment.barber?.name} | {formatDateTime(appointment.scheduled_time)} | {statusMap[appointment.status]} | R$ {appointment.price}
                  <button onClick={() => handleEdit(appointment)}>Editar</button>
                  <button onClick={() => handleDelete(appointment.id)}>Deletar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppointmentList;
