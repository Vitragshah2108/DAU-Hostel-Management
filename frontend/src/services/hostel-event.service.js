import api from './api';

const hostelEventService = {
  getAll: async () => {
    const { data } = await api.get('/hostel-events');
    return data?.data || [];
  },
  create: async (payload) => {
    const { data } = await api.post('/hostel-events', payload);
    return data?.data;
  },
  registerForEvent: async (id) => {
    const { data } = await api.post(`/hostel-events/${id}/register`);
    return data?.data;
  },
};

export default hostelEventService;


