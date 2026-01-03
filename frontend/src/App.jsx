import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Barbers from "./pages/Barbers"; 
import Services from "./pages/Services"; 
import Appointments from "./pages/Appointments";
import Layout from "./components/Layout";
import { ThemeProvider } from "@mui/material/styles"; 
import CssBaseline from "@mui/material/CssBaseline"; 
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />

          {/* Rotas protegidas */}
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/barbers" element={<Barbers />} />
            <Route path="/services" element={<Services />} />
            <Route path="/appointments" element={<Appointments />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
