import api from './api';

const userService = {
  getAllUsers: async () => {
    const { data } = await api.get('/users');
    return data?.data || [];
  },
  updateUser: async (id, payload) => {
    const { data } = await api.put(`/users/${id}`, payload);
    return data?.data;
  },
  deleteUser: async (id) => {
    const { data } = await api.delete(`/users/${id}`);
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
};

export default userService;


