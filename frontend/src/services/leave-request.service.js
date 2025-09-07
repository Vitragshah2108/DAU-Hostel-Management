import api from './api';

const leaveRequestService = {
  getMyRequests: async () => {
    const { data } = await api.get('/leave-requests/my-requests');
    return data?.data || [];
  },
  createRequest: async (payload) => {
    const { data } = await api.post('/leave-requests', payload);
    return data?.data;
  },
};

export default leaveRequestService;


