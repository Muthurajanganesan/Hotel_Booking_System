import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container, 
  Grid,
  Divider
} from '@mui/material';
import bookingService from '../../service/bookingService';

const PaymentForm = ({ bookingId, amount }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const paymentData = {
        bookingId: bookingId || 1,
        amount: amount || 500.00,
        status: 'PAID'
      };
      await bookingService.processPayment(paymentData);
      setMessage('Payment successful! Your stay is confirmed.');
    } catch (error) {
      setMessage('Payment failed. Please check your card details.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Payment Details
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="textSecondary">Amount to Pay</Typography>
          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
            ${amount || '500.00'}
          </Typography>
        </Box>

        <Box component="form" onSubmit={handlePayment}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                placeholder="1234 5678 9101 1121"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                size="large"
                sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
              >
                Pay Now
              </Button>
            </Grid>
          </Grid>
        </Box>
        {message && (
          <Typography align="center" sx={{ mt: 3, color: message.includes('failed') ? 'error.main' : 'success.main', fontWeight: 'medium' }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default PaymentForm;
