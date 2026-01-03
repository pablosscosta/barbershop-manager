import { Link } from "react-router-dom";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";

function Home() {
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
            <Button component={Link} to="/login" variant="contained" color="primary" sx={{ borderRadius: 2, px: 4, py: 1.5 }}>
              Login
            </Button>
            <Button component={Link} to="/register" variant="outlined" color="secondary" sx={{ borderRadius: 2, px: 4, py: 1.5 }}>
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
    </Box>
  );
}

export default Home;
