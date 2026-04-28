import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const getHotels = (location) => {
    return axios.get(`${API_URL}/hotels`, { params: { location } });
};

const getRoomsByHotel = (hotelId) => {
    return axios.get(`${API_URL}/hotels/${hotelId}/rooms`);
};

const searchRooms = (params) => {
    return axios.get(`${API_URL}/rooms`, { params });
};

const getRoomById = (id) => {
    return axios.get(`${API_URL}/rooms/${id}`);
};

const getReviews = (hotelId) => {
    return axios.get(`${API_URL}/reviews/${hotelId}`);
};

const addReview = (reviewData) => {
    return axios.post(`${API_URL}/reviews`, reviewData);
};

export default {
    getHotels,
    getRoomsByHotel,
    searchRooms,
    getRoomById,
    getReviews,
    addReview
};
