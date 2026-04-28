import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Divider, Button } from '@mui/material';
import { Dashboard, People, Hotel, Assessment, Settings } from '@mui/icons-material';

const AdminPanel = () => {
  const stats = [
    { label: 'Total Users', value: '128', icon: <People />, color: '#1976d2' },
    { label: 'Total Hotels', value: '45', icon: <Hotel />, color: '#2e7d32' },
    { label: 'Monthly Revenue', value: '$12,400', icon: <Assessment />, color: '#ed6c02' },
  ];

  return (
    <Box sx={{ p: 4, minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Dashboard sx={{ fontSize: 32, mr: 2, color: '#1976d2' }} />
        <Typography variant="h4" fontWeight={700} color="#333">Admin Dashboard</Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  p: 1.5, borderRadius: 2, backgroundColor: `${stat.color}15`, 
                  color: stat.color, mr: 2, display: 'flex' 
                }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                  <Typography variant="h5" fontWeight={700}>{stat.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 25px rgba(0,0,0,0.05)' }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>Quick Actions</Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button fullWidth variant="outlined" startIcon={<People />}>Manage Users</Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button fullWidth variant="outlined" startIcon={<Hotel />}>Manage Hotels</Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button fullWidth variant="outlined" startIcon={<Assessment />}>View Reports</Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button fullWidth variant="outlined" startIcon={<Settings />}>System Settings</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AdminPanel;
