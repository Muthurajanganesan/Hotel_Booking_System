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
    </Box>
  );
};

export default AdminPanel;
