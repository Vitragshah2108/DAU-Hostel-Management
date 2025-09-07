import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import authService from '../../services/auth.service';
import loginSchema from '../../validations/login.validation';
import { ADMIN, STUDENT } from '../../utils/roles';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import useAuth from '../../hooks/useAuth';

/**
 * Login Page
 * Centers a login card; calls authService.login on submit.
 * On success, redirects based on user.role.
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
    resolver: yupResolver(loginSchema),
  });
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await authService.login(values.email, values.password);
      login(res?.user, res?.token);
      const role = res?.user?.role;
      Toast.success('Logged in successfully');
      if (role === ADMIN) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/student/dashboard', { replace: true });
      }
    } catch (err) {
      Toast.error(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 420 }}>
        <CardHeader title="Login" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button type="submit" variant="contained" disabled={loading}>Login</Button>
            </Stack>
          </form>
          {loading ? <Box sx={{ mt: 2 }}><Loader /></Box> : null}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;


