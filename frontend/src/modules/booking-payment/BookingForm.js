import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container, 
  Grid 
} from '@mui/material';
import bookingService from '../../service/bookingService';

const BookingForm = ({ roomId, userId }) => {
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        userId: userId || 1, // Placeholder for logged in user
        roomId: roomId || 1, // Placeholder for selected room
        checkinDate: checkinDate + "T00:00:00",
        checkoutDate: checkoutDate + "T00:00:00"
      };
      const result = await bookingService.createBooking(bookingData);
      setMessage(`Booking created successfully! ID: ${result.bookingId}`);
    } catch (error) {
      setMessage('Error creating booking. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
          Book Your Stay
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Check-in Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={checkinDate}
                onChange={(e) => setCheckinDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Check-out Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={checkoutDate}
                onChange={(e) => setCheckoutDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, borderRadius: 10 }}
              >
                Confirm Booking
              </Button>
            </Grid>
          </Grid>
        </Box>
        {message && (
          <Typography sx={{ mt: 2, color: message.includes('Error') ? 'error.main' : 'success.main' }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default BookingForm;
