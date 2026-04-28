import React, { useState } from 'react';
import { 
  Box, 
  CssBaseline, 
  ThemeProvider, 
  createTheme, 
  AppBar, 
  Toolbar, 
  Typography, 
  Tab, 
  Tabs,
  Container
} from '@mui/material';
import BookingForm from './modules/booking-payment/BookingForm';
import BookingList from './modules/booking-payment/BookingList';
import PaymentForm from './modules/booking-payment/PaymentForm';

// Light theme as requested in docs
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={1}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              🏨 Hotel Booking - Booking & Payments
            </Typography>
          </Toolbar>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            textColor="inherit" 
            indicatorColor="secondary"
            centered
          >
            <Tab label="New Booking" />
            <Tab label="My Bookings" />
            <Tab label="Payment Mockup" />
          </Tabs>
        </AppBar>

        <Container sx={{ mt: 4, pb: 4 }}>
          {tabValue === 0 && <BookingForm userId={1} roomId={1} />}
          {tabValue === 1 && <BookingList userId={1} />}
          {tabValue === 2 && <PaymentForm bookingId={1} amount={500.00} />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
