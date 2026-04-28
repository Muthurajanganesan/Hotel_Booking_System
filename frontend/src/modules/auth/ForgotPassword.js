import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, CircularProgress,
  InputAdornment, IconButton, Divider, Alert, Stepper, Step, StepLabel
} from '@mui/material';
import { Hotel, Email, Lock, VpnKey, Visibility, VisibilityOff } from '@mui/icons-material';
import { forgotPassword, resetPassword } from '../../service/authService';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccess('OTP has been sent to your email.');
      setActiveStep(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Email not found or error sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      setError('OTP and New Password are required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await resetPassword({ email, otp, newPassword });
      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP or error resetting password.');
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
        width: '100%', maxWidth: 460, borderRadius: 4, overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(25,118,210,0.12)',
      }}>
        {/* Header */}
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
            <VpnKey sx={{ fontSize: 32, color: '#fff' }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="white">Reset Password</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>
            Securely recover your StackVerse account
          </Typography>
        </Box>

        <Box sx={{ px: 4, py: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            <Step><StepLabel>Verify Email</StepLabel></Step>
            <Step><StepLabel>Reset Password</StepLabel></Step>
          </Stepper>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}

          {activeStep === 0 ? (
            <form onSubmit={handleGenerateOtp}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter your registered email address and we'll send you an OTP to reset your password.
              </Typography>
              <TextField
                fullWidth label="Email Address" type="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                margin="normal" variant="outlined"
                InputProps={{ startAdornment: (
                  <InputAdornment position="start"><Email sx={{ color: '#1976d2' }} /></InputAdornment>
                )}}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <Button fullWidth type="submit" variant="contained" size="large" disabled={loading}
                sx={{
                  mt: 3, py: 1.5, borderRadius: 2, fontWeight: 700,
                  background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                  boxShadow: '0 4px 15px rgba(25,118,210,0.35)',
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter the OTP sent to <b>{email}</b> and set your new password.
              </Typography>
              <TextField
                fullWidth label="OTP Code" type="text"
                value={otp} onChange={(e) => setOtp(e.target.value)}
                margin="normal" variant="outlined"
                InputProps={{ startAdornment: (
                  <InputAdornment position="start"><VpnKey sx={{ color: '#1976d2' }} /></InputAdornment>
                )}}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <TextField
                fullWidth label="New Password"
                type={showPassword ? 'text' : 'password'}
                value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
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
              <Button fullWidth type="submit" variant="contained" size="large" disabled={loading}
                sx={{
                  mt: 3, py: 1.5, borderRadius: 2, fontWeight: 700,
                  background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                  boxShadow: '0 4px 15px rgba(25,118,210,0.35)',
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
              </Button>
              <Button fullWidth variant="text" onClick={() => setActiveStep(0)} sx={{ mt: 1 }}>
                Change Email
              </Button>
            </form>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
              Back to Login
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
