import { useState } from 'react';
import './App.css';
import BrowsePage from './modules/browse-review/BrowsePage';
import ReviewDashboardPage from './modules/browse-review/ReviewDashboardPage';
import { CssBaseline, ThemeProvider, createTheme, Box, Button, AppBar, Toolbar, Typography, Container } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#ffffff',
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState('browse');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', letterSpacing: 1 }}>
              HOTELVERSE
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant={currentPage === 'browse' ? 'contained' : 'text'}
                onClick={() => setCurrentPage('browse')}
                sx={{ borderRadius: 2, fontWeight: 'bold' }}
              >
                Browse
              </Button>
              <Button 
                variant={currentPage === 'reviews' ? 'contained' : 'text'}
                onClick={() => setCurrentPage('reviews')}
                sx={{ borderRadius: 2, fontWeight: 'bold' }}
              >
                Reviews Dashboard
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ minHeight: '100vh' }}>
        {currentPage === 'browse' ? <BrowsePage /> : <ReviewDashboardPage />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
