import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import StudentLayout from '../../layouts/StudentLayout';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import ComplaintForm from '../../components/ComplaintForm';
import complaintService from '../../services/complaint.service';

/**
 * Complaints Page
 * Lists student's complaints and allows submitting new ones.
 */

const Complaints = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await complaintService.getMyComplaints();
      setItems(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { load(); }, []);

  const handleSubmit = async (form) => {
    try {
      await complaintService.create(form);
      Toast.success('Complaint submitted');
      setOpen(false);
      load();
    } catch (err) {
      Toast.error(err?.message || 'Submit failed');
    }
  };

  return (
    <StudentLayout title="Complaints">
      {loading ? <Loader /> : (
        <>
          <Card>
            <CardHeader title="My Complaints" action={<Button variant="contained" onClick={() => setOpen(true)}>Submit Complaint</Button>} />
            <CardContent>
              <Stack spacing={1}>
                {items.map((c) => (
                  <Stack key={c.id} direction="row" spacing={2} alignItems="center">
                    <span>{c.title}</span>
                    <span style={{ color: '#666' }}>({c.status})</span>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <ComplaintForm open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
        </>
      )}
    </StudentLayout>
  );
};

export default Complaints;


