import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Paper, Stack, Dialog, DialogTitle, DialogContent } from "@mui/material";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";


function Home() {
  const [openLogin, setOpenLogin] = useState(false); 
  const handleOpenLogin = () => setOpenLogin(true); 
  const handleCloseLogin = () => setOpenLogin(false);

  const [openRegister, setOpenRegister] = useState(false); 
  const handleOpenRegister = () => setOpenRegister(true); 
  const handleCloseRegister = () => setOpenRegister(false);

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      {/* Metade esquerda fixa - imagem */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "50vw",
          height: "100vh",
          backgroundImage: "url('/images/barbershop-home.png')",
          backgroundSize: "cover",
          backgroundPosition: "center left",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Metade direita fixa - conteúdo */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: "50vw",
          width: "50vw",
          height: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 6,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 900, textAlign: "center" }}>
          <Typography variant="h3" gutterBottom color="text.primary" fontWeight="bold">
            Barbershop Manager
          </Typography>
          <Typography variant="subtitle1" gutterBottom color="text.secondary">
            Gestão interna inteligente para barbearias
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ mt: 4, justifyContent: "center" }}>
            <Button 
              onClick={handleOpenLogin} 
              variant="contained" 
              color="primary" 
              sx={{ borderRadius: 2, px: 4, py: 1.5 }}
            >
              Login
            </Button>

            <Button 
              onClick={handleOpenRegister} 
              variant="contained" 
              color="secondary" 
              sx={{ borderRadius: 2, px: 4, py: 1.5 }}
            >
              Cadastro
            </Button>
          </Stack>

          <Paper
            elevation={3}
            sx={{
              mt: 6,
              p: 4,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "secondary.main",
              textAlign: "left",
              width: "100%",
              maxWidth: 900,
            }}
          >
            <Typography variant="h5" gutterBottom color="text.primary">
              Sobre o projeto
            </Typography>
            <Typography variant="body1" color="text.secondary">
              O <strong>Barbershop Manager</strong> é um sistema desenvolvido para facilitar a gestão de barbearias.
              Organize clientes, barbeiros, serviços e agendamentos de forma prática e moderna.
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Modal Login */}
      <Dialog
        open={openLogin} 
        onClose={handleCloseLogin} 
        fullWidth 
        maxWidth="sm"
        TransitionProps={{ timeout: 300 }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: "grey.900",
            color: "grey.100",
            boxShadow: 12,
            p: 3,
          }
        }}

      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
          Entrar
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <LoginForm onSuccess={handleCloseLogin} />
        </DialogContent>
      </Dialog>

      {/* Modal Register */}
      <Dialog
        open={openRegister} 
        onClose={handleCloseRegister} 
        fullWidth 
        maxWidth="sm"
        TransitionProps={{ timeout: 300 }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: "grey.900",
            color: "grey.100",
            boxShadow: 12,
            p: 3,
          }
        }}

      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
          Cadastro
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <RegisterForm onSuccess={handleCloseRegister} />
        </DialogContent>
      </Dialog>

    </Box>
  );
}

export default Home;
