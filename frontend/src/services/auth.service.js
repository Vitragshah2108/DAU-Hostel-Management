import api from './api';

const authService = {
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    // Expect { success, data: { user, token } }
    const payload = data?.data || {};
    if (payload.token) localStorage.setItem('token', payload.token);
    if (payload.user) localStorage.setItem('user', JSON.stringify(payload.user));
    return payload;
  },
  register: async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    return data?.data;
  },
  getProfile: async () => {
    const { data } = await api.get('/auth/profile');
    return data?.data;
  },
  updateProfile: async (payload) => {
    const { data } = await api.put('/auth/profile', payload);
    return data?.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;


