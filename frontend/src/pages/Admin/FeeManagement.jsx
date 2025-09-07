import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import feeService from '../../services/fee.service';

const FeeManagement = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  const load = async () => {
    try {
      setLoading(true);
      const data = await feeService.getAll();
      setItems(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load fees');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { load(); }, []);

  const markPaid = async (id) => {
    try {
      await feeService.updateStatus(id, { status: 'paid' });
      Toast.success('Marked as paid');
      load();
    } catch (err) {
      Toast.error(err?.message || 'Update failed');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <Card>
      <CardHeader title="Fee Management" />
      <CardContent>
        <Grid container spacing={2}>
          {items.map((f) => (
            <Grid key={f._id || f.id} item xs={12} md={6} lg={4}>
              <Card sx={{ p: 2 }}>
                <div>Student: {f.student?.name || '-'}</div>
                <div>Amount Due: ₹ {f.amountDue ?? 0}</div>
                <div>Status: {f.status}</div>
                <Button size="small" sx={{ mt: 1 }} onClick={() => markPaid(f._id || f.id)}>Mark Paid</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FeeManagement;


