import api from './api';

// Compose summary from multiple endpoints
const dashboardService = {
  getStudentSummary: async () => {
    const [roomsRes, feesRes, eventsRes, complaintsRes] = await Promise.all([
      api.get('/room-requests/my-requests'),
      api.get('/fees/my-fees'),
      api.get('/hostel-events'),
      api.get('/complaints/my-complaints'),
    ]);

    const myReq = Array.isArray(roomsRes.data?.data) ? roomsRes.data.data[0] : null;
    const roomStatus = myReq?.status || 'available';
    const feesDue = feesRes.data?.data?.dueAmount ?? 0;
    const upcomingEvents = Array.isArray(eventsRes.data?.data) ? eventsRes.data.data.length : 0;
    const pendingComplaints = Array.isArray(complaintsRes.data?.data)
      ? complaintsRes.data.data.filter(c => c.status !== 'resolved').length
      : 0;

    return { roomStatus, feesDue, upcomingEvents, pendingComplaints };
  },
};

export default dashboardService;


