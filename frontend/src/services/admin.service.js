import api from './api';

const adminService = {
  getDashboardStats: async () => {
    const { data } = await api.get('/admin/dashboard-stats');
    return data?.data;
  },
  getAnalytics: async () => {
    const { data } = await api.get('/admin/analytics');
    return data?.data;
  },
};

export default adminService;


