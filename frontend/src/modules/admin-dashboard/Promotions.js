import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { 
  Box, Typography, Card, Grid, TextField, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, IconButton, Chip, Paper 
} from '@mui/material';
import { Add, Delete, LocalOffer } from '@mui/icons-material';

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [formData, setFormData] = useState({ code: '', discount: '', description: '', validUntil: '' });

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const res = await adminService.getAllPromotions();
      setPromotions(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.createPromotion(formData);
      setFormData({ code: '', discount: '', description: '', validUntil: '' });
      fetchPromotions();
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert(e.response.data); // Display the backend error message
      } else {
        console.error(e);
        alert("An error occurred while creating the promotion.");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminService.deletePromotion(id);
      fetchPromotions();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Promotions Management</Typography>
      
      <Grid container spacing={4}>
        {/* Create Promotion Form */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Create Promotion</Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField 
                  label="Promo Code" 
                  name="code" 
                  value={formData.code} 
                  onChange={handleInputChange} 
                  required 
                  fullWidth
                  placeholder="e.g. SUMMER2024" 
                />
                <TextField 
                  label="Discount %" 
                  name="discount" 
                  type="number"
                  value={formData.discount} 
                  onChange={handleInputChange} 
                  required 
                  fullWidth
                />
                <TextField 
                  label="Description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  required 
                  fullWidth
                  multiline
                  rows={3}
                />
                <TextField 
                  label="Valid Until" 
                  name="validUntil" 
                  type="date"
                  value={formData.validUntil} 
                  onChange={handleInputChange} 
                  required 
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  startIcon={<Add />}
                  sx={{ mt: 1, py: 1.5 }}
                >
                  Add Promotion
                </Button>
              </Box>
            </form>
          </Card>
        </Grid>

        {/* Existing Promotions List */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Active Promotions</Typography>
            
            {promotions.length === 0 ? (
              <Box sx={{ p: 5, textAlign: 'center', color: 'text.secondary', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LocalOffer sx={{ fontSize: 60, opacity: 0.2, mb: 2 }} />
                <Typography variant="body1">No active promotions found. Create one to get started!</Typography>
              </Box>
            ) : (
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead sx={{ bgcolor: 'background.default' }}>
                    <TableRow>
                      <TableCell><strong>Code</strong></TableCell>
                      <TableCell><strong>Discount</strong></TableCell>
                      <TableCell><strong>Valid Until</strong></TableCell>
                      <TableCell align="right"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {promotions.map(promo => (
                      <TableRow key={promo.promoId} hover>
                        <TableCell>
                          <Typography fontWeight="bold">{promo.code}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={`${promo.discount}% OFF`} color="success" size="small" sx={{ fontWeight: 'bold' }} />
                        </TableCell>
                        <TableCell>
                          {new Date(promo.validUntil).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">
                          <Button 
                            variant="outlined" 
                            color="error" 
                            size="small"
                            startIcon={<Delete />}
                            onClick={() => handleDelete(promo.promoId)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Promotions;
