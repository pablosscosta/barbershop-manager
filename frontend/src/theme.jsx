import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#004D61", 
    },
    secondary: {
      main: "#C9A227", 
    },
    background: {
      default: "#121212", 
      paper: "#1E1E1E",   
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#B0B0B0",
    },
    success: {
      main: "#4CAF50",
    },
    error: {
      main: "#F44336",
    },
    warning: {
      main: "#FFC107",
    },
  },
  typography: {
    fontFamily: "Roboto, Inter, sans-serif",
  },
});

export default theme;
