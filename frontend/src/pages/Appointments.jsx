import { useEffect, useState } from "react";
import {
  Box, Typography, TextField, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableHead, TableRow, TableCell, TableBody,
  MenuItem, Select
} from "@mui/material";
import api, { getAppointments, getBarbers, getServices, getClients } from "../services/api";


function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    barber_id: "",
    service_id: "",
    customer_id: "",
    date: "",
    time: "",
    status: "scheduled",
    price: ""
  });

  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  useEffect(() => {
    getAppointments()
      .then(res => setAppointments(res.data))
      .catch(() => alert("Erro ao carregar agendamentos"));

    Promise.all([getBarbers(), getServices(), getClients()])
      .then(([barbersRes, servicesRes, clientsRes]) => {
        setBarbers(barbersRes.data);
        setServices(servicesRes.data);
        setClients(clientsRes.data);
      })
      .catch(() => alert("Erro ao carregar dados auxiliares"));
  }, []);

  const handleOpenModal = (appointment = null) => {
    setEditingAppointment(appointment);
    if (appointment) {
      const dt = new Date(appointment.scheduled_time);
      setFormData({
        barber_id: appointment.barber.id,
        service_id: appointment.service.id,
        customer_id: appointment.customer.id,
        date: dt.toISOString().split("T")[0],
        time: dt.toISOString().split("T")[1].slice(0,5),
        status: appointment.status,
        price: appointment.price
      });
    } else {
      setFormData({
        barber_id: "",
        service_id: "",
        customer_id: "",
        date: "",
        time: "",
        status: "scheduled",
        price: ""
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingAppointment(null);
  };

  const handleSave = () => {
    const scheduled_time = `${formData.date}T${formData.time}:00`;
    const payload = { ...formData, scheduled_time };

    if (editingAppointment) {
      api.put(`/appointments/${editingAppointment.id}/`, payload)
        .then(res => {
          const updated = res.data || { ...editingAppointment, ...payload };
          setAppointments(appointments.map(a => a.id === editingAppointment.id ? updated : a));
          handleCloseModal();
        });
    } else {
      api.post("/appointments/", payload)
        .then(res => {
          setAppointments([...appointments, res.data]);
          handleCloseModal();
        });
    }
  };

  const handleAskDelete = (appointment) => {
    setAppointmentToDelete(appointment);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (appointmentToDelete) {
      api.delete(`/appointments/${appointmentToDelete.id}/`)
        .then(() => {
          setAppointments(appointments.filter(a => a.id !== appointmentToDelete.id));
          setConfirmOpen(false);
          setAppointmentToDelete(null);
        })
        .catch(err => console.error("Erro ao deletar agendamento", err));
    }
  };

  const filteredAppointments = appointments.filter(a =>
    a.customer.name.toLowerCase().includes(search.toLowerCase()) ||
    a.barber.name.toLowerCase().includes(search.toLowerCase())
  );

  const statusMap = {
    scheduled: "Agendado",
    completed: "Concluído",
    canceled: "Cancelado",
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Agendamentos</Typography>

      {/* Busca rápida */}
      <TextField
        label="Buscar por cliente ou barbeiro"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de agendamentos */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Barbeiro</TableCell>
            <TableCell>Serviço</TableCell>
            <TableCell>Data/Hora</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAppointments.map(a => (
            <TableRow key={a.id}>
              <TableCell>{a.customer.name}</TableCell>
              <TableCell>{a.barber.name}</TableCell>
              <TableCell>{a.service.name}</TableCell>
              <TableCell>{new Date(a.scheduled_time).toLocaleString()}</TableCell>
              <TableCell>{statusMap[a.status]}</TableCell>
              <TableCell>R$ {a.price}</TableCell>
              <TableCell>
                <Button size="small" onClick={() => handleOpenModal(a)}>Editar</Button>
                <Button size="small" color="error" onClick={() => handleAskDelete(a)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Botão novo agendamento */}
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleOpenModal()}>
        Novo Agendamento
      </Button>

      {/* Modal de cadastro/edição */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>{editingAppointment ? "Editar Agendamento" : "Novo Agendamento"}</DialogTitle>
        <DialogContent>
          <Select
            fullWidth sx={{ mb: 2 }}
            value={formData.barber_id}
            onChange={(e) => setFormData({ ...formData, barber_id: e.target.value })}
            displayEmpty
          >
            <MenuItem value="">Selecione o barbeiro</MenuItem>
            {barbers.map(b => <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>)}
          </Select>
          <Select
            fullWidth sx={{ mb: 2 }}
            value={formData.service_id}
            onChange={(e) => {
              const selectedId = e.target.value;
              setFormData({ ...formData, service_id: selectedId });
              const selectedService = services.find(s => s.id === selectedId);
              if (selectedService) {
                setFormData(prev => ({ ...prev, price: selectedService.price }));
              }
            }}
            displayEmpty
          >
            <MenuItem value="">Selecione o serviço</MenuItem>
            {services.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
          </Select>
          <Select
            fullWidth sx={{ mb: 2 }}
            value={formData.customer_id}
            onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
            displayEmpty
          >
            <MenuItem value="">Selecione o cliente</MenuItem>
            {clients.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
          </Select>
          <TextField
            label="Data"
            type="date"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hora"
            type="time"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <Select
            fullWidth sx={{ mb: 2 }}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <MenuItem value="scheduled">Agendado</MenuItem>
            <MenuItem value="completed">Concluído</MenuItem>
            <MenuItem value="canceled">Cancelado</MenuItem>
          </Select>
          <TextField
            label="Preço"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmar exclusão */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir o agendamento de <strong>{appointmentToDelete?.customer?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Appointments;
