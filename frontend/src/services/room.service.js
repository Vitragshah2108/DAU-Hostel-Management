import api from './api';

const roomService = {
  getAll: async () => {
    const { data } = await api.get('/rooms');
    return data?.data || [];
  },
  create: async (payload) => {
    const { data } = await api.post('/rooms', payload);
    return data?.data;
  },
  updateStatus: async (id, status) => {
    const { data } = await api.put(`/rooms/${id}/status`, { status });
    return data?.data;
  },
  assignOccupant: async (id, userId) => {
    const { data } = await api.put(`/rooms/${id}/assign`, { userId });
    return data?.data;
  },
  getMyRequests: async () => {
    const { data } = await api.get('/room-requests/my-requests');
    return data?.data || [];
  },
  createRequest: async (roomId) => {
    const { data } = await api.post('/room-requests', { roomId });
    return data?.data;
  },
};

export default roomService;


