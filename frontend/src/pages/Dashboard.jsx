import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Box, Grid, Card, CardContent, Typography, 
  List, ListItem, ListItemText, Stack, Button,
  Dialog, DialogTitle, DialogContent
} from "@mui/material";
import { getDashboardSummary } from "../services/api";
import api from "../services/api"; // usado para GET nos detalhes

function Dashboard() {
  const [summary, setSummary] = useState({
    customers: 0,
    barbers: 0,
    services: 0,
    appointments: 0,
    agenda_today: [],
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    getDashboardSummary()
      .then(res => setSummary(res.data))
      .catch(err => console.error("Erro ao carregar resumo", err));
  }, []);

  const handleOpenModal = (type) => {
    setModalType(type);
    setOpenModal(true);

    api.get(`/${type}`)
      .then(res => setModalData(res.data))
      .catch(err => console.error("Erro ao carregar detalhes", err));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData([]);
  };

  const modalTypeMap = {
    customers: "Clientes",
    barbers: "Barbeiros",
    services: "Serviços",
    appointments: "Agendamentos"
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
    <Box sx={{ p: 3 }}>
      {/* Cards de resumo */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 , md: 3}}>
          <Card>
            <CardContent>
              <Typography variant="h6">Clientes</Typography>
              <Typography variant="h4">{summary.customers}</Typography>
              <Button size="small" onClick={() => handleOpenModal("customers")}>
                Ver detalhes
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 , md: 3}}>
          <Card>
            <CardContent>
              <Typography variant="h6">Barbeiros ativos</Typography>
              <Typography variant="h4">{summary.barbers}</Typography>
              <Button size="small" onClick={() => handleOpenModal("barbers")}>
                Ver detalhes
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 , md: 3}}>
          <Card>
            <CardContent>
              <Typography variant="h6">Serviços</Typography>
              <Typography variant="h4">{summary.services}</Typography>
              <Button size="small" onClick={() => handleOpenModal("services")}>
                Ver detalhes
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 , md: 3}}>
          <Card>
            <CardContent>
              <Typography variant="h6">Agendamentos futuros</Typography>
              <Typography variant="h4">{summary.appointments}</Typography>
              <Button size="small" onClick={() => handleOpenModal("appointments")}>
                Ver detalhes
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Agenda do dia */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Agenda do dia</Typography>
          {summary.agenda_today.length > 0 ? (
            <List>
              {summary.agenda_today.map((item, idx) => (
                <ListItem key={idx}>
                  <ListItemText 
                    primary={`${item.customer} - ${item.service}`} 
                    secondary={`Barbeiro: ${item.barber} | ${item.time} | ${item.status}`} 
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nenhum agendamento para hoje.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Atalhos rápidos */}
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button component={Link} to="/appointments" variant="contained" color="primary">
          Novo agendamento
        </Button>
        <Button component={Link} to="/clients" variant="outlined" color="secondary">
          Cadastrar cliente
        </Button>
        <Button component={Link} to="/services" variant="outlined" color="secondary">
          Adicionar serviço
        </Button>
      </Stack>

      {/* Modal de detalhes */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>Detalhes - {modalTypeMap[modalType]} </DialogTitle>
        <DialogContent>
          {modalData.length > 0 ? (
            <List>
              {modalData.map((item, idx) => (
                <ListItem key={idx}>
                  {modalType === "customers" && (
                    <ListItemText 
                      primary={item.name} 
                      secondary={`Email: ${item.email} | Telefone: ${item.phone}`} 
                    />
                  )}
                  {modalType === "barbers" && (
                    <ListItemText 
                      primary={item.name} 
                      secondary={`Status: ${item.is_active ? "Ativo" : "Inativo"}`} 
                    />
                  )}
                  {modalType === "services" && (
                    <ListItemText 
                      primary={item.name} 
                      secondary={`Preço: R$ ${item.price} | Duração: ${item.duration_minutes} min`} 
                    />
                  )}
                  {modalType === "appointments" && (
                    <ListItemText 
                      primary={`${item.customer.name} - ${item.service.name}`} 
                      secondary={`Barbeiro: ${item.barber.name} | Status: ${statusMap[item.status]} para ${formatDateTime(item.scheduled_time)}`} 
                    />
                  )}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nenhum registro encontrado.
            </Typography>
          )}
        </DialogContent>
      </Dialog>

    </Box>
  );
}

export default Dashboard;
