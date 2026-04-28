import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Chip
} from '@mui/material';
import bookingService from '../../service/bookingService';

const BookingList = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getBookingsByUserId(userId || 1);
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await bookingService.cancelBooking(id);
      fetchBookings();
    } catch (error) {
      alert('Error cancelling booking');
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        My Bookings
      </Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Booking ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Room ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Check-in</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Check-out</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.bookingId} hover>
                <TableCell>{booking.bookingId}</TableCell>
                <TableCell>{booking.roomId}</TableCell>
                <TableCell>{new Date(booking.checkinDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(booking.checkoutDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip label={booking.status} color={getStatusColor(booking.status)} size="small" />
                </TableCell>
                <TableCell>
                  {booking.status === 'BOOKED' && (
                    <Button 
                      variant="outlined" 
                      color="error" 
                      size="small"
                      onClick={() => handleCancel(booking.bookingId)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">No bookings found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BookingList;
