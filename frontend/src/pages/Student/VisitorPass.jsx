import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StudentLayout from '../../layouts/StudentLayout';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import VisitorPassForm from '../../components/VisitorPassForm';
import visitorPassService from '../../services/visitor-pass.service';

/**
 * VisitorPass Page
 * Shows student's visitor pass requests and allows creating a new one.
 */

const VisitorPass = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await visitorPassService.getMyPasses();
      setItems(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load visitor passes');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { load(); }, []);

  const handleSubmit = async (form) => {
    try {
      await visitorPassService.create(form);
      Toast.success('Visitor pass requested');
      setOpen(false);
      load();
    } catch (err) {
      Toast.error(err?.message || 'Request failed');
    }
  };

  return (
    <StudentLayout title="Visitor Pass">
      {loading ? <Loader /> : (
        <>
          <Card>
            <CardHeader title="My Visitor Passes" action={<Button variant="contained" onClick={() => setOpen(true)}>Request Visitor Pass</Button>} />
            <CardContent>
              <Grid container spacing={2}>
                {items.map((p) => (
                  <Grid key={p.id} item xs={12} md={6} lg={4}>
                    <Card sx={{ p: 2 }}>
                      <Typography variant="subtitle1">Visitor: {p.visitorName}</Typography>
                      <Typography variant="body2">Status: {p.status}</Typography>
                      {p.qr ? <img alt="QR" src={p.qr} style={{ marginTop: 8, width: 160, height: 160 }} /> : null}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <VisitorPassForm open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
        </>
      )}
    </StudentLayout>
  );
};

export default VisitorPass;


