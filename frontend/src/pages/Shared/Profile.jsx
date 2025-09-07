import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import userService from '../../services/user.service';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';

/**
 * Profile Page
 * Loads current user's profile, allows editing of name/phone and password change.
 */
const Profile = () => {
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [profile, setProfile] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', phone: '', password: '' });

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await userService.getProfile();
      setProfile(data);
      setForm({ name: data?.name || '', phone: data?.phone || '', password: '' });
    } catch (err) {
      Toast.error(err?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = { name: form.name, phone: form.phone };
      if (form.password) payload.password = form.password;
      const updated = await userService.updateProfile(payload);
      setProfile(updated);
      setForm((prev) => ({ ...prev, password: '' }));
      Toast.success('Profile updated');
    } catch (err) {
      Toast.error(err?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Card>
        <CardHeader title="My Profile" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
                <TextField label="Email" value={profile?.email || ''} fullWidth disabled />
                <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth />
                <TextField label="Role" value={profile?.role || ''} fullWidth disabled />
                {profile?.role === 'student' && (
                  <TextField label="Roll Number" value={profile?.rollNumber || ''} fullWidth disabled />
                )}
                <TextField label="New Password (optional)" type="password" name="password" value={form.password} onChange={handleChange} fullWidth />
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={handleSave} disabled={saving}>Save Changes</Button>
                  {saving ? <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>Saving...</Typography> : null}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;


