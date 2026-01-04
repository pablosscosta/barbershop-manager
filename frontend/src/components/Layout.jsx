import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: 240, 
            boxSizing: "border-box",
            bgcolor: "grey.800",   // fundo escuro
            color: "grey.100"      // texto claro
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem 
              button 
              component={Link} 
              to="/dashboard" 
              sx={{ "&.Mui-selected": { bgcolor: "primary.main", color: "white" } }}
            >
              <ListItemText 
                primary="Dashboard" 
                primaryTypographyProps={{ sx: { color: "white" } }} 
              />
            </ListItem>

            <ListItem button component={Link} to="/clients">
              <ListItemText 
                primary="Clientes" 
                primaryTypographyProps={{ sx: { color: "white" } }} 
              />
            </ListItem>

            <ListItem button component={Link} to="/barbers">
              <ListItemText 
                primary="Barbeiros" 
                primaryTypographyProps={{ sx: { color: "white" } }} 
              />
            </ListItem>

            <ListItem button component={Link} to="/services">
              <ListItemText 
                primary="Serviços" 
                primaryTypographyProps={{ sx: { color: "white" } }} 
              />
            </ListItem>

            <ListItem button component={Link} to="/appointments">
              <ListItemText 
                primary="Agendamentos" 
                primaryTypographyProps={{ sx: { color: "white" } }} 
              />
            </ListItem>
          </List>

        </Box>
      </Drawer>

      {/* Conteúdo principal */}
      <Box component="main" sx={{ bgcolor: "background.default", flexGrow: 1, p: 3 }}>
        {/* Header */}
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "grey.900",   // fundo escuro
            color: "grey.100"      // texto claro
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap component="div">
              Sistema Barbearia
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Espaço para o conteúdo da página */}
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
