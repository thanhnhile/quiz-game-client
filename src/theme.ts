import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#610C9F", // Set the default background color
    },
    primary: {
      main: "#610C9F",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Roboto",
          color: "#fff",
        },
        h1: {
          fontSize: "6rem",
          fontWeight: "700px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontSize: "1.4rem",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: "62.5%",
        },
      },
    },
  },
});

export default theme;
