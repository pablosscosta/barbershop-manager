import { useEffect, useState } from "react";
import { 
  Box, Typography, TextField, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableHead, TableRow, TableCell, TableBody
} from "@mui/material";
import api, { getServices } from "../services/api";

function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ name: "", duration_minutes: "", price: "", description: "" });  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  useEffect(() => {
    getServices()
      .then(res => setServices(res.data))
      .catch(() => alert("Erro ao carregar serviços"));
  }, []);

  const handleOpenModal = (service = null) => {
    setEditingService(service);
    setFormData(service ? {
      name: service.name,
      duration_minutes: service.duration_minutes,
      price: service.price,
      description: service.description
    } : { name: "", duration_minutes: "", price: "", description: "" });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingService(null);
    setFormData({ name: "", duration_minutes: "", price: "", description: "" });
  };

  const handleSave = () => {
    if (editingService) {
      api.put(`/services/${editingService.id}/`, formData)
        .then(res => {
          const updated = res.data || { ...editingService, ...formData };
          setServices(services.map(s => s.id === editingService.id ? updated : s));
          handleCloseModal();
        });
    } else {
      api.post("/services/", formData)
        .then(res => {
          setServices([...services, res.data]);
          handleCloseModal();
        });
    }
  };

  const handleDelete = (id) => {
    api.delete(`/services/${id}/`)
      .then(() => setServices(services.filter(s => s.id !== id)))
      .catch(() => alert("Erro ao excluir serviço"));

  };

  const handleAskDelete = (service) => {
    setServiceToDelete(service);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (serviceToDelete) {
      api.delete(`/services/${serviceToDelete.id}/`)
        .then(() => {
          setServices(services.filter(s => s.id !== serviceToDelete.id));
          setConfirmOpen(false);
          setServiceToDelete(null);
        })
        .catch(err => console.error("Erro ao deletar serviço", err));
    }
  };


  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Serviços</Typography>

      {/* Busca rápida */}
      <TextField
        label="Buscar por nome"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de serviços */}
      {filteredServices.length === 0 && search ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Não temos serviço correspondente com "{search}"
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Duração (min)</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.map(service => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.duration_minutes} minutos</TableCell>
                <TableCell>R$ {service.price}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleOpenModal(service)}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleAskDelete(service)}>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Botão novo serviço */}
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleOpenModal()}>
        Novo Serviço
      </Button>

      {/* Modal de cadastro/edição */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>{editingService ? "Editar Serviço" : "Novo Serviço"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Duração (minutos)"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.duration_minutes}
            onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
          />
          <TextField
            label="Preço"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <TextField
            label="Descrição"
            multiline
            rows={3}
            fullWidth
            sx={{ mb: 2 }}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
            Tem certeza que deseja excluir o serviço <strong>{serviceToDelete?.name}</strong>?
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

export default Services;
