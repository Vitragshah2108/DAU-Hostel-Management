import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import visitorPassService from '../../services/visitor-pass.service';

const VisitorPassManagement = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  const load = async () => {
    try {
      setLoading(true);
      const data = await visitorPassService.getAll();
      setItems(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load visitor passes');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { load(); }, []);

  const approve = async (id) => {
    try {
      await visitorPassService.approve(id);
      Toast.success('Approved');
      load();
    } catch (err) {
      Toast.error(err?.message || 'Approve failed');
    }
  };
  const reject = async (id) => {
    try {
      await visitorPassService.reject(id, {});
      Toast.success('Rejected');
      load();
    } catch (err) {
      Toast.error(err?.message || 'Reject failed');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <Card>
      <CardHeader title="Visitor Pass Requests" />
      <CardContent>
        <Grid container spacing={2}>
          {items.map((p) => (
            <Grid key={p._id || p.id} item xs={12} md={6} lg={4}>
              <Card sx={{ p: 2 }}>
                <div>Visitor: {p.visitorName}</div>
                <div>Student: {p.student?.name || '-'}</div>
                <div>Status: {p.status}</div>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button size="small" onClick={() => approve(p._id || p.id)}>Approve</Button>
                  <Button size="small" onClick={() => reject(p._id || p.id)}>Reject</Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VisitorPassManagement;


