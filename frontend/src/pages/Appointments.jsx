import { useEffect, useState } from "react";
import { getAppointments } from "../services/api";
import AppointmentForm from "../components/appointments/AppointmentForm";
import AppointmentList from "../components/appointments/AppointmentList";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  // Carregar agendamentos ao montar
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getAppointments();
        setAppointments(res.data);
      } catch (err) {
        alert("Erro ao carregar agendamentos");
      }
    };
    fetchAppointments();
  }, []);

  // Callback para adicionar agendamento recém-criado
  const handleAppointmentCreated = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Agendamentos</h1>
      <h2>Novo Agendamento</h2>
      <AppointmentForm onAppointmentCreated={handleAppointmentCreated} />
      <h2>Lista de Agendamentos</h2>
      <AppointmentList appointments={appointments} setAppointments={setAppointments} />
    </div>
  );
}

export default Appointments;
