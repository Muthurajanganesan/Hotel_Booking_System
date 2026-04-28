import React, { useEffect, useState, useCallback } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Button,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Box, Alert
} from '@mui/material';
import bookingService from '../../service/bookingService';

const BookingList = ({ userId, onPayNow }) => {
  const [bookings, setBookings] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newCheckin, setNewCheckin] = useState('');
  const [newCheckout, setNewCheckout] = useState('');
  const [alert, setAlert] = useState({ msg: '', type: '' });

  const fetchBookings = useCallback(async () => {
    try {
      const data = await bookingService.getBookingsByUserId(userId || 1);
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  }, [userId]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const handleCancelClick = async (booking) => {
    const confirm = window.confirm(
      `Are you sure you want to cancel Booking #${booking.bookingId}?\n\n` +
      `Refund Policy:\n` +
      `- Same day cancellation: 100% refund\n` +
      `- After 1 day (before check-in): 70% refund\n` +
      `- After check-in: 70% refund of remaining days`
    );
    if (!confirm) return;
    try {
      await bookingService.cancelBooking(booking.bookingId, userId || 1);
      setAlert({ msg: 'Booking cancelled. Refund will be processed as per policy.', type: 'success' });
      fetchBookings();
    } catch (err) {
      setAlert({ msg: err.response?.data || 'Error cancelling booking.', type: 'error' });
    }
  };

  const handleEditClick = (booking) => {
    setSelectedBooking(booking);
    setNewCheckin(booking.checkinDate?.split('T')[0] || '');
    setNewCheckout(booking.checkoutDate?.split('T')[0] || '');
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const nights = (new Date(newCheckout) - new Date(newCheckin)) / (1000 * 60 * 60 * 24);
      await bookingService.updateBooking(selectedBooking.bookingId, {
        ...selectedBooking,
        checkinDate: newCheckin + 'T00:00:00',
        checkoutDate: newCheckout + 'T00:00:00',
        totalAmount: nights > 0 ? (selectedBooking.totalAmount / ((new Date(selectedBooking.checkoutDate) - new Date(selectedBooking.checkinDate)) / 86400000)) * nights : selectedBooking.totalAmount
      }, userId || 1);
      setAlert({ msg: 'Booking dates updated successfully!', type: 'success' });
      setEditDialogOpen(false);
      fetchBookings();
    } catch (err) {
      setAlert({ msg: err.response?.data || 'Error updating booking. Dates may overlap.', type: 'error' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'BOOKED': return 'primary';
      case 'CANCELLED': return 'error';
      case 'COMPLETED': return 'success';
      default: return 'default';
    }
  };

  const getRefundInfo = (booking) => {
    if (booking.status !== 'CANCELLED') return null;
    const total = parseFloat(booking.totalAmount || 0);
    const fine = parseFloat(booking.fine || 0);
    const refund = (total - fine).toFixed(2);
    if (total === 0) return 'No amount recorded';
    return `Refund: $${refund} | Penalty: $${fine.toFixed(2)}`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        📋 My Bookings
      </Typography>

      {alert.msg && (
        <Alert severity={alert.type} onClose={() => setAlert({ msg: '', type: '' })} sx={{ mb: 2 }}>
          {alert.msg}
        </Alert>
      )}

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Room</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Check-in</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Check-out</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Refund Info</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((b) => (
              <TableRow key={b.bookingId} hover>
                <TableCell>#{b.bookingId}</TableCell>
                <TableCell>Room {b.roomId}</TableCell>
                <TableCell>{new Date(b.checkinDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(b.checkoutDate).toLocaleDateString()}</TableCell>
                <TableCell>${parseFloat(b.totalAmount || 0).toFixed(2)}</TableCell>
                <TableCell>
                  <Chip label={b.status} color={getStatusColor(b.status)} size="small" />
                </TableCell>
                <TableCell>
                  <Typography variant="caption" color="text.secondary">
                    {getRefundInfo(b) || '—'}
                  </Typography>
                </TableCell>
                <TableCell>
                  {b.status === 'BOOKED' && (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button variant="contained" color="success" size="small" onClick={() => onPayNow && onPayNow(b)}>
                        Pay Now
                      </Button>
                      <Button variant="outlined" size="small" onClick={() => handleEditClick(b)}>
                        Change Dates
                      </Button>
                      <Button variant="outlined" color="error" size="small" onClick={() => handleCancelClick(b)}>
                        Cancel
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Change Booking Dates</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField label="New Check-in Date" type="date" InputLabelProps={{ shrink: true }}
              value={newCheckin} onChange={(e) => setNewCheckin(e.target.value)} fullWidth />
            <TextField label="New Check-out Date" type="date" InputLabelProps={{ shrink: true }}
              value={newCheckout} onChange={(e) => setNewCheckout(e.target.value)} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookingList;
