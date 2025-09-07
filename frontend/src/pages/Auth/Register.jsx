import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import authService from '../../services/auth.service';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';

/**
 * Register Page (optional)
 * Calls authService.register on submit and redirects to login on success.
 */
const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { name: '', email: '', password: '', phone: '', role: 'student', rollNumber: '' },
    mode: 'onTouched',
  });
  const [loading, setLoading] = React.useState(false);

  const role = watch('role');

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await authService.register({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        role: values.role,
        rollNumber: values.role === 'student' ? values.rollNumber : undefined,
      });
      Toast.success('Registered successfully. Please login.');
      navigate('/login', { replace: true });
    } catch (err) {
      Toast.error(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 520 }}>
        <CardHeader title="Register" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField label="Name" fullWidth {...register('name', { required: 'Name is required' })} error={!!errors.name} helperText={errors.name?.message} />
              <TextField label="Email" type="email" fullWidth {...register('email', { required: 'Email is required' })} error={!!errors.email} helperText={errors.email?.message} />
              <TextField label="Password" type="password" fullWidth {...register('password', { required: 'Password is required' })} error={!!errors.password} helperText={errors.password?.message} />
              <TextField label="Phone" fullWidth {...register('phone')} />
              <TextField select label="Role" fullWidth defaultValue="student" {...register('role', { required: true })}>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
              {role === 'student' && (
                <TextField label="Roll Number" fullWidth {...register('rollNumber', { required: 'Roll Number is required for students' })} error={!!errors.rollNumber} helperText={errors.rollNumber?.message} />
              )}
              <Button type="submit" variant="contained" disabled={loading}>Register</Button>
            </Stack>
          </form>
          {loading ? <Box sx={{ mt: 2 }}><Loader /></Box> : null}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;


