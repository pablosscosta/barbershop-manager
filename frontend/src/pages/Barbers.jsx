import { useEffect, useState } from "react";
import { 
  Box, Typography, TextField, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableHead, TableRow, TableCell, TableBody
} from "@mui/material";
import api, { getBarbers } from "../services/api";

function Barbers() {
  const [barbers, setBarbers] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingBarber, setEditingBarber] = useState(null);
  const [formData, setFormData] = useState({ name: "", is_active: true });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [barberToDelete, setBarberToDelete] = useState(null);

  useEffect(() => {
    getBarbers()
      .then(res => setBarbers(res.data))
      .catch(() => alert("Erro ao carregar barbeiros"));
  }, []);

  const handleOpenModal = (barber = null) => {
    setEditingBarber(barber);
    setFormData(barber ? { name: barber.name, is_active: barber.is_active } : { name: "", is_active: true });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingBarber(null);
    setFormData({ name: "", is_active: true });
  };

  const handleSave = () => {
    if (editingBarber) {
      api.put(`/barbers/${editingBarber.id}/`, formData)
        .then(res => {
          const updated = res.data || { ...editingBarber, ...formData };
          setBarbers(barbers.map(b => b.id === editingBarber.id ? updated : b));
          handleCloseModal();
        });
    } else {
      api.post("/barbers/", formData)
        .then(res => {
          setBarbers([...barbers, res.data]);
          handleCloseModal();
        });
    }
  };

  const handleDelete = (id) => {
    api.delete(`/barbers/${id}/`)
      .then(() => setBarbers(barbers.filter(b => b.id !== id)))
      .catch(() => alert("Erro ao excluir barbeiro"));
  };

  const handleAskDelete = (barber) => {
    setBarberToDelete(barber);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (barberToDelete) {
      api.delete(`/barbers/${barberToDelete.id}/`)
        .then(() => {
          setBarbers(barbers.filter(c => b.id !== barberToDelete.id));
          setConfirmOpen(false);
          setBarberToDelete(null);
        })
        .catch(err => console.error("Erro ao deletar barbeiro", err));
    }
  };

  const filteredBarbers = barbers.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Barbeiros</Typography>

      {/* Busca rápida */}
      <TextField
        label="Buscar por nome"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de barbeiros */}
      {filteredBarbers.length === 0 && search ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Não temos barbeiro correspondente com "{search}"
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBarbers.map(barber => (
              <TableRow key={barber.id}>
                <TableCell>{barber.name}</TableCell>
                <TableCell>{barber.is_active ? "Ativo" : "Inativo"}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleOpenModal(barber)}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleAskDelete(barber)}>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Botão novo barbeiro */}
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleOpenModal()}>
        Novo Barbeiro
      </Button>

      {/* Modal de cadastro/edição */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>{editingBarber ? "Editar Barbeiro" : "Novo Barbeiro"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Status (true/false)"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.is_active ? "Ativo" : "Inativo"}
            onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
            InputProps={{ readOnly: true }}
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
            Tem certeza que deseja excluir o barbeiro <strong>{barberToDelete?.name}</strong>?
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

export default Barbers;
