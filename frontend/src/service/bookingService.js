import axios from 'axios';

const API_URL = 'http://localhost:8080';

const bookingService = {
  createBooking: async (bookingData) => {
    const response = await axios.post(`${API_URL}/api/bookings`, bookingData);
    return response.data;
  },

  getBookingById: async (id) => {
    const response = await axios.get(`${API_URL}/api/bookings/${id}`);
    return response.data;
  },

  getBookingsByUserId: async (userId) => {
    const response = await axios.get(`${API_URL}/api/bookings/user/${userId}`);
    return response.data;
  },

  cancelBooking: async (id, userId) => {
    const response = await axios.delete(`${API_URL}/api/bookings/${id}?userId=${userId}`);
    return response.data;
  },

  updateBooking: async (id, bookingData, userId) => {
    const response = await axios.put(`${API_URL}/api/bookings/${id}?userId=${userId}`, bookingData);
    return response.data;
  },

  // Creates a Stripe PaymentIntent on the backend, returns clientSecret
  createPaymentIntent: async (paymentData) => {
    const response = await axios.post(`${API_URL}/api/payments`, paymentData);
    return response.data;
  },

  getPaymentByBookingId: async (bookingId) => {
    const response = await axios.get(`${API_URL}/api/payments/booking/${bookingId}`);
    return response.data;
  }
};

export default bookingService;
