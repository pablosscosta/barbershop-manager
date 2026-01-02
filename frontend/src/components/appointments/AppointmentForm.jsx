import { useState, useEffect } from "react";
import { createAppointment, getBarbers, getServices, getClients } from "../../services/api";

function AppointmentForm({ onAppointmentCreated }) {
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);

  const [barber, setBarber] = useState("");
  const [service, setService] = useState("");
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("scheduled");
  const [price, setPrice] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduledTime = `${date}T${time}:00`;

    const payload = {
      barber_id: barber,
      service_id: service,
      customer_id: customer,
      scheduled_time: scheduledTime,
      status,
      price: parseFloat(price).toFixed(2),
    };

    console.log(payload);

    try {
      const res = await createAppointment(payload);
      alert("Agendamento criado com sucesso!");
      setBarber("");
      setService("");
      setCustomer("");
      setDate("");
      setTime("");
      setStatus("scheduled");
      setPrice("");
      if (onAppointmentCreated) {
        onAppointmentCreated(res.data);
      }
    } catch (err) {
      alert("Erro ao criar agendamento");
    }
  };


  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div>
        <label>Barbeiro:</label>
        <select
          value={barber}
          onChange={(e) => setBarber(parseInt(e.target.value))}
          required
        >
          <option value="">Selecione</option>
          {barbers.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Serviço:</label>
        <select
          value={service}
          onChange={(e) => {
            const selectedId = parseInt(e.target.value);
            setService(selectedId);
            const selectedService = services.find(s => s.id === selectedId);
            if (selectedService) {
              setPrice(selectedService.price);
            }
          }}
        >
          <option value="">Selecione</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Cliente:</label>
        <select
          value={customer}
          onChange={(e) => setCustomer(parseInt(e.target.value))}
          required
        >
          <option value="">Selecione</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Data:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Hora:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="scheduled">Agendado</option>
          <option value="completed">Concluído</option>
          <option value="canceled">Cancelado</option>
        </select>
      </div>
      <div>
        <label>Preço:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />
      </div>
      <button type="submit">Adicionar Agendamento</button>
    </form>
  );
}

export default AppointmentForm;
