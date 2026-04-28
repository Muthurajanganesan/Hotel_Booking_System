import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, CircularProgress,
  InputAdornment, IconButton, Divider, Alert, MenuItem
} from '@mui/material';
import { Visibility, VisibilityOff, Hotel, Email, Lock, Person, BadgeOutlined } from '@mui/icons-material';
import { signup } from '../../service/authService';
import { useNavigate, Link } from 'react-router-dom';

const ROLES = [
  { value: 'ROLE_CUSTOMER', label: 'Customer – Browse & Book Hotels' },
  { value: 'ROLE_MANAGER',  label: 'Manager – List & Manage Hotels' },
];

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'ROLE_CUSTOMER' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                    e.name = 'Full name is required';
    if (!form.email)                          e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password)                       e.password = 'Password is required';
    else if (form.password.length < 6)        e.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword)                e.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
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
      await signup({ name: form.name, email: form.email, password: form.password, role: form.role });
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  const inputSx = { '& .MuiOutlinedInput-root': { borderRadius: 2 } };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e9 0%, #ffffff 60%, #e3f2fd 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, py: 4,
    }}>
      <Paper elevation={4} sx={{
        width: '100%', maxWidth: 480, borderRadius: 4, overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(76,175,80,0.12)',
      }}>
        {/* Green header */}
        <Box sx={{
          background: 'linear-gradient(135deg, #388e3c 0%, #1b5e20 100%)',
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
          <Typography variant="h5" fontWeight={700} color="white">Create Your Account</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>
            Join StackVerse Hotels today
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ px: 4, py: 4 }}>
          {apiError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{apiError}</Alert>}

          <TextField fullWidth label="Full Name" name="name" value={form.name} onChange={handleChange}
            error={!!errors.name} helperText={errors.name} margin="normal" variant="outlined"
            InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: '#388e3c' }} /></InputAdornment> }}
            sx={inputSx}
          />
          <TextField fullWidth label="Email Address" name="email" type="email" value={form.email} onChange={handleChange}
            error={!!errors.email} helperText={errors.email} margin="normal" variant="outlined"
            InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: '#388e3c' }} /></InputAdornment> }}
            sx={inputSx}
          />
          <TextField fullWidth label="Password (min. 6 characters)" name="password"
            type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange}
            error={!!errors.password} helperText={errors.password} margin="normal" variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#388e3c' }} /></InputAdornment>,
              endAdornment: <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
            }}
            sx={inputSx}
          />
          <TextField fullWidth label="Confirm Password" name="confirmPassword"
            type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange}
            error={!!errors.confirmPassword} helperText={errors.confirmPassword} margin="normal" variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#388e3c' }} /></InputAdornment>,
              endAdornment: <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
            }}
            sx={inputSx}
          />
          <TextField fullWidth select label="Register as" name="role" value={form.role} onChange={handleChange}
            margin="normal" variant="outlined"
            InputProps={{ startAdornment: <InputAdornment position="start"><BadgeOutlined sx={{ color: '#388e3c' }} /></InputAdornment> }}
            sx={inputSx}
          >
            {ROLES.map((r) => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
          </TextField>

          <Button fullWidth type="submit" variant="contained" size="large" disabled={loading}
            sx={{
              mt: 3, py: 1.5, borderRadius: 2, fontWeight: 700, fontSize: '1rem',
              background: 'linear-gradient(135deg, #388e3c, #1b5e20)',
              boxShadow: '0 4px 15px rgba(56,142,60,0.35)',
              '&:hover': { background: 'linear-gradient(135deg, #2e7d32, #1b5e20)' },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">Already have an account?</Typography>
          </Divider>

          <Button fullWidth variant="outlined" size="large" component={Link} to="/login"
            sx={{
              borderRadius: 2, fontWeight: 600, borderColor: '#388e3c', color: '#388e3c',
              '&:hover': { borderColor: '#2e7d32', backgroundColor: '#e8f5e9' },
            }}
          >
            Sign In Instead
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
