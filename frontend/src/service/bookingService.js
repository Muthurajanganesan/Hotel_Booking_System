import axios from 'axios';

const API_URL = 'http://localhost:8080';

const bookingService = {
  createBooking: async (bookingData) => {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return response.data;
  },

  getBookingById: async (id) => {
    const response = await axios.get(`${API_URL}/bookings/${id}`);
    return response.data;
  },

  getBookingsByUserId: async (userId) => {
    const response = await axios.get(`${API_URL}/bookings/user/${userId}`);
    return response.data;
  },

  cancelBooking: async (id) => {
    const response = await axios.delete(`${API_URL}/bookings/${id}`);
    return response.data;
  },

  processPayment: async (paymentData) => {
    const response = await axios.post(`${API_URL}/payments`, paymentData);
    return response.data;
  },

  getPaymentByBookingId: async (bookingId) => {
    const response = await axios.get(`${API_URL}/payments/booking/${bookingId}`);
    return response.data;
  }
};

export default bookingService;
