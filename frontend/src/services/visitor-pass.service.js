import api from './api';

const visitorPassService = {
  getAll: async () => {
    const { data } = await api.get('/visitor-passes');
    return data?.data || [];
  },
  getMyPasses: async () => {
    const { data } = await api.get('/visitor-passes/my-passes');
    return data?.data || [];
  },
  create: async (payload) => {
    const { data } = await api.post('/visitor-passes', payload);
    return data?.data;
  },
  approve: async (id) => {
    const { data } = await api.put(`/visitor-passes/${id}/approve`);
    return data?.data;
  },
  reject: async (id, payload) => {
    const { data } = await api.put(`/visitor-passes/${id}/reject`, payload);
    return data?.data;
  },
};

export default visitorPassService;


