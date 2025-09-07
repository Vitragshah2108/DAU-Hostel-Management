import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import roomRequestService from '../../services/room-request.service';

const RoomRequests = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  const load = async () => {
    try {
      setLoading(true);
      const data = await roomRequestService.getAll();
      setItems(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load room requests');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { load(); }, []);

  const approve = async (id) => {
    try {
      await roomRequestService.approve(id);
      Toast.success('Approved');
      load();
    } catch (err) {
      Toast.error(err?.message || 'Approve failed');
    }
  };
  const reject = async (id) => {
    try {
      await roomRequestService.reject(id);
      Toast.success('Rejected');
      load();
    } catch (err) {
      Toast.error(err?.message || 'Reject failed');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <Card>
      <CardHeader title="Room Requests" />
      <CardContent>
        <Grid container spacing={2}>
          {items.map((r) => (
            <Grid key={r._id || r.id} item xs={12} md={6} lg={4}>
              <Card sx={{ p: 2 }}>
                <div>Student: {r.student?.name || r.user?.name || '-'}</div>
                <div>Room: {r.room?.roomNumber || '-'}</div>
                <div>Status: {r.status}</div>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button size="small" onClick={() => approve(r._id || r.id)}>Approve</Button>
                  <Button size="small" onClick={() => reject(r._id || r.id)}>Reject</Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RoomRequests;


