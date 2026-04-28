import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const adminService = {
  // Hotel Approval
  getPendingRequests: () => axios.get(`${API_URL}/admin/hotels/requests`),
  approveHotel: (id) => axios.put(`${API_URL}/admin/hotels/${id}/approve`),
  rejectHotel: (id) => axios.put(`${API_URL}/admin/hotels/${id}/reject`),
  deleteHotel: (id) => axios.delete(`${API_URL}/admin/hotels/${id}`),

  // Analytics
  getRevenue: () => axios.get(`${API_URL}/analytics/revenue`),
  getOccupancy: () => axios.get(`${API_URL}/analytics/occupancy`),

  // Promotions
  createPromotion: (promoData) => axios.post(`${API_URL}/promotions`, promoData),
  getAllPromotions: () => axios.get(`${API_URL}/promotions`),
  deletePromotion: (id) => axios.delete(`${API_URL}/promotions/${id}`),
};
