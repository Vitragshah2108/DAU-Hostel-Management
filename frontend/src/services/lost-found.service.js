import api from './api';

const lostFoundService = {
  getAll: async () => {
    const { data } = await api.get('/lost-found');
    return data?.data || [];
  },
  create: async (payload) => {
    // backend has separate endpoints for lost/found; we can pick by payload.type
    if (payload.type === 'found') {
      const { data } = await api.post('/lost-found/found', payload);
      return data?.data;
    }
    const { data } = await api.post('/lost-found/lost', payload);
    return data?.data;
  },
  approveClaim: async (id) => {
    const { data } = await api.put(`/lost-found/${id}/approve-claim`);
    return data?.data;
  },
};

export default lostFoundService;


