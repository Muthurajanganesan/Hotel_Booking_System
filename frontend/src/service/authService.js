import api from './api';

export const login          = (data)        => api.post('/auth/login', data);
export const signup         = (data)        => api.post('/auth/signup', data);
export const forgotPassword = (email)       => api.post('/auth/forgot-password', { email });
export const resetPassword  = (data)        => api.post('/auth/reset-password', data);
export const getUserProfile = (id)          => api.get(`/users/${id}`);
export const updateUserProfile = (id, data) => api.put(`/users/${id}`, data);
