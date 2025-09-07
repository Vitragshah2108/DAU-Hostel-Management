import api from './api';

const complaintService = {
  getAll: async () => {
    const { data } = await api.get('/complaints');
    return data?.data || [];
  },
  getMyComplaints: async () => {
    const { data } = await api.get('/complaints/my-complaints');
    return data?.data || [];
  },
  create: async (payload) => {
    const { data } = await api.post('/complaints', payload);
    return data?.data;
  },
  updateStatus: async (id, status) => {
    const { data } = await api.put(`/complaints/${id}/status`, { status });
    return data?.data;
  },
  addAdminNote: async (id, note) => {
    const { data } = await api.put(`/complaints/${id}/note`, { note });
    return data?.data;
  },
};

export default complaintService;


