import api from './api';

const notificationService = {
  getAll: async () => {
    const { data } = await api.get('/notifications');
    return data?.data || [];
  },
  getMyNotifications: async () => {
    const { data } = await api.get('/notifications/my-notifications');
    return data?.data || [];
  },
  create: async (payload) => {
    const { data } = await api.post('/notifications', payload);
    return data?.data;
  },
  markAsRead: async (id) => {
    const { data } = await api.put(`/notifications/${id}/read`);
    return data?.data;
  },
};

export default notificationService;


