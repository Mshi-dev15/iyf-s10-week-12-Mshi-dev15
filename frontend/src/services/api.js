import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle expired token
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me')
};

// Posts
export const postsAPI = {
    getAll: () => api.get('/posts'),
    getById: (id) => api.get(`/posts/${id}`),
    create: (data) => api.post('/posts', data),
    update: (id, data) => api.put(`/posts/${id}`, data),
    delete: (id) => api.delete(`/posts/${id}`),
    like: (id) => api.post(`/posts/${id}/like`)
};

// Comments
export const commentsAPI = {
    getByPost: (postId) => api.get(`/posts/${postId}/comments`),
    create: (postId, data) => api.post(`/posts/${postId}/comments`, data),
    delete: (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`)
};

export default api;