import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { 
  Box, Typography, Card, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Chip, Paper, CircularProgress
} from '@mui/material';
import { CheckCircle, Cancel, Delete } from '@mui/icons-material';

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await adminService.getPendingRequests();
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await adminService.approveHotel(id);
      fetchRequests();
    } catch (error) {
      console.error("Error approving hotel", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await adminService.rejectHotel(id);
      fetchRequests();
    } catch (error) {
      console.error("Error rejecting hotel", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminService.deleteHotel(id);
      fetchRequests();
    } catch (error) {
      console.error("Error deleting hotel", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'warning';
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Hotel Enrollment Requests</Typography>
      
      <Card>
        {requests.length === 0 ? (
          <Box p={4} textAlign="center">
            <Typography variant="body1" color="text.secondary">No pending hotel requests at this time.</Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead sx={{ backgroundColor: 'background.default' }}>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Hotel Name</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Manager</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((hotel) => (
                  <TableRow key={hotel.hotelId} hover>
                    <TableCell>#{hotel.hotelId}</TableCell>
                    <TableCell>{hotel.name}</TableCell>
                    <TableCell>{hotel.location}</TableCell>
                    <TableCell>{hotel.managerName || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={hotel.status} 
                        color={getStatusColor(hotel.status)} 
                        size="small" 
                        sx={{ fontWeight: 'bold' }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="success" onClick={() => handleApprove(hotel.hotelId)} title="Approve">
                        <CheckCircle />
                      </IconButton>
                      <IconButton color="warning" onClick={() => handleReject(hotel.hotelId)} title="Reject">
                        <Cancel />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(hotel.hotelId)} title="Delete">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
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
