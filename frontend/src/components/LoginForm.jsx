import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { Box, Stack, TextField, Button, Alert, CircularProgress } from "@mui/material";

export default function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await login(username, password);
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      onSuccess?.();

      navigate("/dashboard");
    } catch (err) {
      setErrorMsg("Usuário ou senha inválidos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <TextField
          label="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          fullWidth
          required
        />

        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          fullWidth
          required
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ py: 1.25 }}
        >
          {loading ? (
            <Stack direction="row" alignItems="center" spacing={1}>
              <CircularProgress size={20} />
              Entrando...
            </Stack>
          ) : (
            "Entrar"
          )}
        </Button>
      </Stack>
    </Box>
  );
}
