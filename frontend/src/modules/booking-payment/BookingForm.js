import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper,
  Container, Grid, Alert
} from '@mui/material';
import bookingService from '../../service/bookingService';

const BookingForm = ({ roomId, userId, pricePerNight = 100, onBookingSuccess }) => {
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Today's date string for min attribute (prevents past dates)
  const today = new Date().toISOString().split('T')[0];

  const calculateNights = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const diff = (new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const totalAmount = nights * pricePerNight;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (nights <= 0) {
      setError('Check-out date must be after check-in date.');
      return;
    }
    try {
      const bookingData = {
        userId: userId || 1,
        roomId: roomId || 1,
        checkinDate: checkinDate + 'T00:00:00',
        checkoutDate: checkoutDate + 'T00:00:00',
        totalAmount: totalAmount
      };
      const result = await bookingService.createBooking(bookingData);
      setMessage(`✅ Booking confirmed! ID: ${result.bookingId}. Redirecting to payment...`);

      // Redirect to payment after short delay
      setTimeout(() => {
        if (onBookingSuccess) onBookingSuccess(result);
      }, 1200);

    } catch (err) {
      setError(err.response?.data || 'Room is not available for selected dates or an error occurred.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
          🛏️ Book Your Stay
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Check-in Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: today }}
                value={checkinDate}
                onChange={(e) => setCheckinDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Check-out Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: checkinDate || today }}
                value={checkoutDate}
                onChange={(e) => setCheckoutDate(e.target.value)}
                required
              />
            </Grid>
            {nights > 0 && (
              <Grid item xs={12}>
                <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 1, border: '1px solid #90caf9' }}>
                  <Typography variant="body2" color="text.secondary">Stay Duration</Typography>
                  <Typography variant="h6" color="primary">{nights} night{nights !== 1 ? 's' : ''}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    ${pricePerNight}/night × {nights} = <strong>${totalAmount.toFixed(2)}</strong>
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 1, borderRadius: 10, py: 1.5 }}
              >
                Confirm Booking
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingForm;
