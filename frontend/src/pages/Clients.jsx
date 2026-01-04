import { useEffect, useState } from "react";
import { 
  Box, Typography, TextField, Button, 
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableHead, TableRow, TableCell, TableBody
} from "@mui/material";
import api from "../services/api";
import ClientForm from "../components/clients/ClientForm"; 

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);


  useEffect(() => {
    api.get("/customers")
      .then(res => setClients(res.data))
      .catch(err => console.error("Erro ao carregar clientes", err));
  }, []);

  const handleOpenModal = (client = null) => {
    setEditingClient(client);
    setFormData(client ? { name: client.name, phone: client.phone, email: client.email } : { name: "", phone: "", email: "" });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingClient(null);
    setFormData({ name: "", phone: "", email: "" });
  };

  const handleClientCreated = (newClient) => {
    setClients([...clients, newClient]);
    handleCloseModal();
  };

  const handleClientUpdated = (updatedClient) => {
    setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
    handleCloseModal();
  };

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const handleSave = () => {
    if (editingClient) {
      api.put(`/customers/${editingClient.id}/`, formData)
        .then(res => {
          const updated = res.data || { ...editingClient, ...formData };
          setClients(clients.map(c => c.id === editingClient.id ? updated : c));
          handleCloseModal();
        });
    } else {
      api.post("/customers/", formData)
        .then(res => {
          setClients([...clients, res.data]);
          handleCloseModal();
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      api.delete(`/customers/${id}/`)
        .then(() => {
          setClients(clients.filter(c => c.id !== id));
        })
        .catch(err => console.error("Erro ao deletar cliente", err));
    }
  };

  const handleAskDelete = (client) => {
    setClientToDelete(client);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (clientToDelete) {
      api.delete(`/customers/${clientToDelete.id}/`)
        .then(() => {
          setClients(clients.filter(c => c.id !== clientToDelete.id));
          setConfirmOpen(false);
          setClientToDelete(null);
        })
        .catch(err => console.error("Erro ao deletar cliente", err));
    }
  };


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Clientes</Typography>

      {/* Busca rápida */}
      <TextField 
        label="Buscar por nome ou telefone"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de clientes */}
      {filteredClients.length === 0 && search ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Não temos usuário correspondente com "{search}"
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map(client => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleOpenModal(client)}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleAskDelete(client)}>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Botão novo cliente */}
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleOpenModal()}>
        Novo Cliente
      </Button>

      {/* Modal de cadastro/edição */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>{editingClient ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Telefone"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            Tem certeza que deseja excluir o cliente <strong>{clientToDelete?.name}</strong>?
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

export default ClientsPage;
