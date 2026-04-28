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
// App.js — Root of the frontend
// Renders the Navbar + currently active module.
// Other team members add their module routes here.

import React, { useState } from 'react';
import Navbar from './component/Navbar';
import HotelRoomPage from './modules/hotel-room/HotelRoomPage';
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  ThemeProvider, CssBaseline, AppBar, Toolbar, Typography,
  Button, Box, Avatar
} from '@mui/material';
import { Hotel } from '@mui/icons-material';
import theme from './theme/muiTheme';
import Login from './modules/auth/Login';
import Register from './modules/auth/Register';
import ForgotPassword from './modules/auth/ForgotPassword';
import AdminPanel from './modules/admin-dashboard/AdminPanel';

// Placeholder components for other modules (stubs – other team members will fill these in)
const Hotels   = () => <Box p={4}><Typography variant="h4">Hotels – Module 2</Typography></Box>;

function AppContent() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static" elevation={0} sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
      }}>
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexGrow: 1 }}>
            <Hotel sx={{ color: '#fff', mr: 1, fontSize: 28 }} />
            <Typography variant="h6" fontWeight={700} color="white">StackVerse Hotels</Typography>
          </Box>

          <Button color="inherit" component={Link} to="/hotels" sx={{ fontWeight: 500 }}>Hotels</Button>

          {user?.role === 'ROLE_ADMIN' && (
            <Button color="inherit" component={Link} to="/admin" sx={{ fontWeight: 500 }}>Admin</Button>
          )}

          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.25)', fontSize: '0.9rem' }}>
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2" color="white" fontWeight={500}>{user.name}</Typography>
              <Button variant="outlined" size="small" onClick={handleLogout}
                sx={{ ml: 1, color: '#fff', borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.1)' },
                }}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
              <Button component={Link} to="/login" variant="outlined" size="small"
                sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.1)' },
                }}>Login</Button>
              <Button component={Link} to="/register" variant="contained" size="small"
                sx={{ bgcolor: '#fff', color: '#1976d2', fontWeight: 700,
                  '&:hover': { bgcolor: '#e3f2fd' },
                }}>Register</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/hotels"   element={<Hotels />} />
        <Route path="/admin"    element={<AdminPanel />} />
        <Route path="/" element={
          <Box sx={{
            minHeight: 'calc(100vh - 64px)',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 60%, #e8f5e9 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 2, p: 4, textAlign: 'center',
          }}>
            <Hotel sx={{ fontSize: 72, color: '#1976d2' }} />
            <Typography variant="h3" fontWeight={700} color="#212121">Welcome to StackVerse Hotels</Typography>
            <Typography variant="h6" color="text.secondary" maxWidth={520}>
              Discover premium stays around the world. Book your perfect hotel in minutes.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button variant="contained" size="large" component={Link} to="/hotels"
                sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: 700,
                  background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                  boxShadow: '0 4px 15px rgba(25,118,210,0.35)',
                }}>Explore Hotels</Button>
              {!user && (
                <Button variant="outlined" size="large" component={Link} to="/register"
                  sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: 700,
                    borderColor: '#1976d2', color: '#1976d2',
                    '&:hover': { background: '#e3f2fd' },
                  }}>Get Started</Button>
              )}
            </Box>
          </Box>
        } />
      </Routes>
    </>
  );
}

function App() {
  // Simple module switcher — replace with <BrowserRouter> + <Route>
  // when all 5 modules are ready.
  const [activeModule, setActiveModule] = useState('hotels');

  const renderModule = () => {
    switch (activeModule) {
      case 'hotels':
        return <HotelRoomPage />;
      // Other modules plug in here:
      // case 'browse':   return <BrowseReviewPage />;
      // case 'bookings': return <BookingPaymentPage />;
      // case 'admin':    return <AdminDashboardPage />;
      default:
        return (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9e9e9e' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>🚧 Coming Soon</h2>
            <p>This module is being built by another team member.</p>
          </div>
        );
    }
  };

  return (
    <div className="app-root">
      <Navbar activeModule={activeModule} onNavigate={setActiveModule} />
      <main>{renderModule()}</main>
    </div>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
