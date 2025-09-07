import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import StudentLayout from '../../layouts/StudentLayout';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import LostFoundCard from '../../components/LostFoundCard';
import lostFoundService from '../../services/lost-found.service';

/**
 * LostFound Page
 * Browse and report lost/found items.
 */

const LostFound = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ title: '', description: '', type: 'lost', photo: '' });

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

  const submit = async () => {
    try {
      await lostFoundService.report(form);
      Toast.success('Item reported');
      setOpen(false);
      setForm({ title: '', description: '', type: 'lost', photo: '' });
      load();
    } catch (err) {
      Toast.error(err?.message || 'Submit failed');
    }
  };

  return (
    <StudentLayout title="Lost & Found">
      {loading ? <Loader /> : (
        <>
          <Card>
            <CardHeader title="Items" action={<Button variant="contained" onClick={() => setOpen(true)}>Report Item</Button>} />
            <CardContent>
              <Grid container spacing={2}>
                {items.map((it) => (
                  <Grid key={it.id} item xs={12} md={6} lg={4}>
                    <LostFoundCard title={it.title} description={it.description} status={it.status} photo={it.photo} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle>Report Item</DialogTitle>
            <DialogContent>
              <TextField label="Title" fullWidth margin="dense" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <TextField label="Description" fullWidth margin="dense" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <TextField select label="Type" fullWidth margin="dense" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </TextField>
              {/* TODO: photo upload */}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={submit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </StudentLayout>
  );
};

export default LostFound;


