import api from './api';

const roomRequestService = {
  getAll: async () => {
    const { data } = await api.get('/room-requests');
    return data?.data || [];
  },
  getMyRequests: async () => {
    const { data } = await api.get('/room-requests/my-requests');
    return data?.data || [];
  },
  create: async (roomId) => {
    const { data } = await api.post('/room-requests', { roomId });
    return data?.data;
  },
  approve: async (id) => {
    const { data } = await api.put(`/room-requests/${id}/approve`);
    return data?.data;
  },
  reject: async (id) => {
    const { data } = await api.put(`/room-requests/${id}/reject`);
    return data?.data;
  },
};

export default roomRequestService;


