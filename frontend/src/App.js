import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Button } from '@mui/material';
import { Domain, PieChart, LocalOffer, Logout } from '@mui/icons-material';
import muiTheme from './theme/muiTheme';

import AdminPanel from './modules/admin-dashboard/AdminPanel';
import Analytics from './modules/admin-dashboard/Analytics';
import Promotions from './modules/admin-dashboard/Promotions';

const drawerWidth = 260;

function AdminLayout({ children }) {
  const location = useLocation();

  const navItems = [
    { text: 'Hotel Requests', path: '/admin/requests', icon: <Domain /> },
    { text: 'Analytics', path: '/admin/analytics', icon: <PieChart /> },
    { text: 'Promotions', path: '/admin/promotions', icon: <LocalOffer /> },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" color="primary" fontWeight="bold">HotelAdmin</Typography>
        </Box>
        <Divider />
        <List sx={{ flex: 1, px: 2, pt: 2 }}>
          {navItems.map((item) => (
            <ListItem 
              button="true"
              component={NavLink} 
              to={item.path} 
              key={item.text}
              sx={{
                mb: 1,
                borderRadius: 2,
                color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                bgcolor: location.pathname === item.path ? 'primary.light' : 'transparent',
                '&:hover': {
                  bgcolor: location.pathname === item.path ? 'primary.light' : 'action.hover',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button 
            variant="outlined" 
            color="error" 
            fullWidth 
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4, ml: `${drawerWidth}px`, width: `calc(100% - ${drawerWidth}px)` }}>
        {children}
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/analytics" replace />} />
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="requests" element={<AdminPanel />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="promotions" element={<Promotions />} />
              </Routes>
            </AdminLayout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
