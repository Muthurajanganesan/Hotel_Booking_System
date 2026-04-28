import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Light Blue
    },
    secondary: {
      main: '#f5f5f5', // Soft Gray
    },
    success: {
      main: '#4caf50', // Green accent
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 600 },
    h2: { fontSize: '1.75rem', fontWeight: 600 },
    h3: { fontSize: '1.5rem', fontWeight: 500 },
    h4: { fontSize: '1.25rem', fontWeight: 500 },
    button: { textTransform: 'uppercase', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default muiTheme;
const theme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#1976d2' },  // Light Blue
    secondary:  { main: '#4caf50' },  // Green
    background: { default: '#f5f5f5', paper: '#ffffff' },
    text:       { primary: '#212121', secondary: '#616161' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    body1: { fontSize: '1rem' },
  },
  shape: { borderRadius: 8 },
});

export default theme;
