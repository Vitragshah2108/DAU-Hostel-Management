import api from './api';

const feeService = {
  getAll: async () => {
    const { data } = await api.get('/fees');
    return data?.data || [];
  },
  getMyFees: async () => {
    const { data } = await api.get('/fees/my-fees');
    return data?.data;
  },
  updateStatus: async (id, payload) => {
    const { data } = await api.put(`/fees/${id}/pay`, payload);
    return data?.data;
  },
};

export default feeService;


