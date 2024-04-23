import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#610C9F', // Set the default background color
    },
    primary: {
      main: '#940B92',
    },
    secondary: {
      main: '#333333',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Roboto',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '1.6rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '3px',
          fontSize: '1.6rem',
          color: '#ffff',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '62.5%',
        },
      },
    },
  },
});

export default theme;
