import { 
  Box, Grid, Card, CardContent, Typography, 
  List, ListItem, ListItemText, Stack, Button 
} from "@mui/material";

function Dashboard() {
  const totalClientes = 120;
  const barbeirosAtivos = 8;
  const servicosCadastrados = 15;
  const agendamentosFuturos = 32;

  return (
    <Box sx={{ p: 3 }}>
      {/* Cards de resumo */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Clientes</Typography>
              <Typography variant="h4">{totalClientes}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Barbeiros ativos</Typography>
              <Typography variant="h4">{barbeirosAtivos}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Serviços</Typography>
              <Typography variant="h4">{servicosCadastrados}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Agendamentos futuros</Typography>
              <Typography variant="h4">{agendamentosFuturos}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Agenda do dia */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Agenda do dia</Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="João - Corte Masculino" 
                secondary="Barbeiro: Carlos | 14:00 | Agendado" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Maria - Barba completa" 
                secondary="Barbeiro: Pedro | 15:30 | Concluído" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Lucas - Corte + Barba" 
                secondary="Barbeiro: Rafael | 16:00 | Cancelado" 
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Atalhos rápidos */}
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" color="primary">Novo agendamento</Button>
        <Button variant="outlined" color="secondary">Cadastrar cliente</Button>
        <Button variant="outlined" color="secondary">Adicionar serviço</Button>
      </Stack>

      {/* Espaço para gráficos */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Serviços mais usados</Typography>
              <Typography variant="body2" color="text.secondary">
                (Gráfico aqui futuramente)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Status dos agendamentos</Typography>
              <Typography variant="body2" color="text.secondary">
                (Gráfico aqui futuramente)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
