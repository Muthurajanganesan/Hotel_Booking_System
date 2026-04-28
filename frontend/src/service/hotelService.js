// hotelService.js
// All API calls for Hotel & Room management (Module 2)
// Backend base URL: http://localhost:8081/api

import axios from 'axios';

// Base URL uses relative path — CRA dev proxy forwards to http://localhost:8081
// See "proxy" field in package.json
const BASE_URL = '/api';

// ─────────────────────────────────────────────
//  HOTEL endpoints
// ─────────────────────────────────────────────

/**
 * Create a new hotel (Manager)
 * POST /api/hotels/manager
 */
export const createHotel = (hotelDTO) =>
  axios.post(`${BASE_URL}/hotels/manager`, hotelDTO);

/**
 * Update an existing hotel (Manager)
 * PUT /api/hotels/manager/:id
 */
export const updateHotel = (id, hotelDTO) =>
  axios.put(`${BASE_URL}/hotels/manager/${id}`, hotelDTO);

/**
 * Get a single hotel by ID
 * GET /api/hotels/:id
 */
export const getHotelById = (id) =>
  axios.get(`${BASE_URL}/hotels/${id}`);

/**
 * Get all hotels
 * GET /api/hotels
 */
export const getAllHotels = () =>
  axios.get(`${BASE_URL}/hotels`);

/**
 * Get hotels owned by a specific manager
 * GET /api/hotels/manager/:managerId
 */
export const getHotelsByManager = (managerId) =>
  axios.get(`${BASE_URL}/hotels/manager/${managerId}`);

/**
 * Delete a hotel (Manager)
 * DELETE /api/hotels/manager/:id
 */
export const deleteHotel = (id) =>
  axios.delete(`${BASE_URL}/hotels/manager/${id}`);

// ─────────────────────────────────────────────
//  ROOM endpoints
// ─────────────────────────────────────────────

/**
 * Add a room to a hotel (Manager)
 * POST /api/rooms/manager
 */
export const addRoom = (roomDTO) =>
  axios.post(`${BASE_URL}/rooms/manager`, roomDTO);

/**
 * Update a room (Manager)
 * PUT /api/rooms/manager/:id
 */
export const updateRoom = (id, roomDTO) =>
  axios.put(`${BASE_URL}/rooms/manager/${id}`, roomDTO);

/**
 * Get a single room by ID
 * GET /api/rooms/:id
 */
export const getRoomById = (id) =>
  axios.get(`${BASE_URL}/rooms/${id}`);

/**
 * Get all rooms for a hotel
 * GET /api/rooms/hotel/:hotelId
 */
export const getRoomsByHotel = (hotelId) =>
  axios.get(`${BASE_URL}/rooms/hotel/${hotelId}`);

/**
 * Delete a room (Manager)
 * DELETE /api/rooms/manager/:id
 */
export const deleteRoom = (id) =>
  axios.delete(`${BASE_URL}/rooms/manager/${id}`);
