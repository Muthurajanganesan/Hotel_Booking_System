import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Box, Typography, Card, Grid, CircularProgress, Avatar } from '@mui/material';
import { AttachMoney, ShowChart, Hotel } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Analytics = () => {
  const [revenueData, setRevenueData] = useState(null);
  const [occupancyData, setOccupancyData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Example placeholder chart data
  const chartData = [
    { name: 'Jan', revenue: 4000, occupancy: 24 },
    { name: 'Feb', revenue: 3000, occupancy: 13 },
    { name: 'Mar', revenue: 2000, occupancy: 98 },
    { name: 'Apr', revenue: 2780, occupancy: 39 },
    { name: 'May', revenue: 1890, occupancy: 48 },
    { name: 'Jun', revenue: 2390, occupancy: 38 },
    { name: 'Jul', revenue: 3490, occupancy: 43 },
  ];

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [revReq, occReq] = await Promise.all([
        adminService.getRevenue(),
        adminService.getOccupancy()
      ]);
      setRevenueData(revReq.data);
      setOccupancyData(occReq.data);
    } catch (error) {
      console.error("Error fetching analytics", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Analytics Dashboard</Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 56, height: 56 }}>
              <AttachMoney fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">TOTAL REVENUE</Typography>
              <Typography variant="h4" fontWeight="bold">${revenueData?.revenue || 0}</Typography>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'success.light', color: 'success.main', width: 56, height: 56 }}>
              <ShowChart fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">OCCUPANCY RATE</Typography>
              <Typography variant="h4" fontWeight="bold">{(occupancyData?.occupancyRate || 0).toFixed(1)}%</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'error.light', color: 'error.main', width: 56, height: 56 }}>
              <Hotel fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">TOTAL BOOKINGS</Typography>
              <Typography variant="h4" fontWeight="bold">{occupancyData?.totalBookings || 0}</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Revenue Overview</Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f5f5f5'}} />
                  <Bar dataKey="revenue" fill="#1976d2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Occupancy Trends</Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="occupancy" stroke="#4caf50" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
