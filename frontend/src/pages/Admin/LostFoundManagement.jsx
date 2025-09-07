import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import lostFoundService from '../../services/lost-found.service';

const LostFoundManagement = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  const load = async () => {
    try {
      setLoading(true);
      const data = await lostFoundService.getAll();
      setItems(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { load(); }, []);

  const approve = async (id) => {
    try {
      await lostFoundService.approveClaim(id);
      Toast.success('Claim approved');
      load();
    } catch (err) {
      Toast.error(err?.message || 'Approve failed');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <Card>
      <CardHeader title="Lost & Found Management" />
      <CardContent>
        <Grid container spacing={2}>
          {items.map((it) => (
            <Grid key={it._id || it.id} item xs={12} md={6} lg={4}>
              <Card sx={{ p: 2 }}>
                <div>Title: {it.title}</div>
                <div>Status: {it.status}</div>
                <Button size="small" sx={{ mt: 1 }} onClick={() => approve(it._id || it.id)}>Approve Claim</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LostFoundManagement;


