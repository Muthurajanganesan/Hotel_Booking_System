import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, CircularProgress,
  InputAdornment, IconButton, Divider, Alert
} from '@mui/material';
import { Visibility, VisibilityOff, Hotel, Email, Lock } from '@mui/icons-material';
import { login } from '../../service/authService';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email)                         e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password)                      e.password = 'Password is required';
    else if (form.password.length < 6)       e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await login({ email: form.email, password: form.password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      // Role-based redirect
      if (user.role === 'ROLE_ADMIN')        navigate('/admin');
      else if (user.role === 'ROLE_MANAGER') navigate('/hotels');
      else                                   navigate('/hotels');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 60%, #e8f5e9 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2,
    }}>
      <Paper elevation={4} sx={{
        width: '100%', maxWidth: 440, borderRadius: 4, overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(25,118,210,0.12)',
      }}>
        {/* Blue header */}
        <Box sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          py: 4, px: 4, textAlign: 'center',
        }}>
          <Box sx={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mx: 'auto', mb: 1.5,
          }}>
            <Hotel sx={{ fontSize: 32, color: '#fff' }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="white">Welcome Back</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>
            Sign in to StackVerse Hotels
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ px: 4, py: 4 }}>
          {apiError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{apiError}</Alert>}

          <TextField
            fullWidth label="Email Address" name="email" type="email"
            value={form.email} onChange={handleChange}
            error={!!errors.email} helperText={errors.email}
            margin="normal" variant="outlined"
            InputProps={{ startAdornment: (
              <InputAdornment position="start"><Email sx={{ color: '#1976d2' }} /></InputAdornment>
            )}}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <TextField
            fullWidth label="Password" name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password} onChange={handleChange}
            error={!!errors.password} helperText={errors.password}
            margin="normal" variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"><Lock sx={{ color: '#1976d2' }} /></InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <Box sx={{ textAlign: 'right', mt: 0.5 }}>
            <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: '#1976d2', textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </Box>

          <Button fullWidth type="submit" variant="contained" size="large" disabled={loading}
            sx={{
              mt: 3, py: 1.5, borderRadius: 2, fontWeight: 700, fontSize: '1rem',
              background: 'linear-gradient(135deg, #1976d2, #1565c0)',
              boxShadow: '0 4px 15px rgba(25,118,210,0.35)',
              '&:hover': { background: 'linear-gradient(135deg, #1565c0, #0d47a1)' },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">New to StackVerse?</Typography>
          </Divider>

          <Button fullWidth variant="outlined" size="large" component={Link} to="/register"
            sx={{
              borderRadius: 2, fontWeight: 600, borderColor: '#1976d2', color: '#1976d2',
              '&:hover': { borderColor: '#1565c0', backgroundColor: '#e3f2fd' },
            }}
          >
            Create an Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
