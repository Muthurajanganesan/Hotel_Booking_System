import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements, CardElement, useStripe, useElements
} from '@stripe/react-stripe-js';
import {
  Box, Button, Typography, Paper, Container,
  Divider, CircularProgress, Alert
} from '@mui/material';
import bookingService from '../../service/bookingService';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': { color: '#aab7c4' },
      fontFamily: '"Roboto", sans-serif',
    },
    invalid: { color: '#9e2146' },
  },
};

const CheckoutForm = ({ bookingId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Step 1: Create PaymentIntent on backend
      const data = await bookingService.createPaymentIntent({
        bookingId: bookingId,
        amount: amount
      });

      const clientSecret = data.clientSecret;
      if (!clientSecret) {
        setError('Could not get payment details from server.');
        setLoading(false);
        return;
      }

      // Step 2: Confirm card payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setSuccess(`✅ Payment of $${parseFloat(amount).toFixed(2)} successful! Your booking is confirmed.`);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'Payment failed. Please try again.';
      setError(errorMsg);
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1, mb: 2, bgcolor: '#fafafa' }}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="success"
        size="large"
        disabled={!stripe || loading}
        sx={{ py: 1.5, borderRadius: 2 }}
      >
        {loading
          ? <CircularProgress size={24} color="inherit" />
          : `Pay $${parseFloat(amount).toFixed(2)}`}
      </Button>

      <Typography variant="caption" color="text.secondary" display="block" align="center" sx={{ mt: 1.5 }}>
        🔒 Secured by Stripe. Test card: 4242 4242 4242 4242
      </Typography>
    </Box>
  );
};

const PaymentForm = ({ bookingId, amount }) => {
  // Guard: show helpful message if no booking has been selected yet
  if (!bookingId || !amount || parseFloat(amount) <= 0) {
    return (
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ p: 4, mt: 6, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            💳 Secure Payment
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            No booking selected.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please go to <strong>New Booking</strong> to book a room, or click <strong>Pay Now</strong> from <strong>My Bookings</strong> to proceed with an existing booking.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          💳 Secure Payment
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Amount to Pay</Typography>
          <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
            ${parseFloat(amount).toFixed(2)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Booking #{bookingId}
          </Typography>
        </Box>

        <Elements stripe={stripePromise}>
          <CheckoutForm bookingId={bookingId} amount={amount} />
        </Elements>
      </Paper>
    </Container>
  );
};

export default PaymentForm;
