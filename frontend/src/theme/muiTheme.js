import { createTheme } from '@mui/material/styles';

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
