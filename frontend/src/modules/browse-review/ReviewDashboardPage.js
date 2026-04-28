import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Rating, Avatar, Divider, Chip, CircularProgress, MenuItem, TextField } from '@mui/material';
import hotelService from '../../services/hotelService';
import ReviewForm from './ReviewForm';

const ReviewDashboardPage = () => {
    const [allReviews, setAllReviews] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [selectedHotelId, setSelectedHotelId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch hotels for the dropdown
            const hotelRes = await hotelService.getHotels('');
            setHotels(hotelRes.data);

            // Fetch dummy reviews (or real ones if available)
            const dummyReviews = [
                {
                    id: 1,
                    userName: "John Doe",
                    hotelName: "Grand Palace",
                    rating: 5,
                    comment: "Exceptional service and the rooms were spotless. Highly recommended!",
                    createdAt: new Date().toISOString(),
                    category: "Luxury"
                },
                {
                    id: 2,
                    userName: "Alice Smith",
                    hotelName: "Ocean Breeze",
                    rating: 4,
                    comment: "Beautiful view of the ocean. The breakfast was amazing.",
                    createdAt: new Date().toISOString(),
                    category: "Beachfront"
                }
            ];
            setAllReviews(dummyReviews);
        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReviewSubmit = async (reviewData) => {
        if (!selectedHotelId) {
            alert("Please select a hotel first.");
            return;
        }
        try {
            await hotelService.addReview({
                ...reviewData,
                hotelId: selectedHotelId,
                userId: 1 // Mock user
            });
            alert("Review submitted successfully!");
            window.location.reload();
        } catch (err) {
            console.error("Failed to submit review", err);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
                    Review Analytics Dashboard
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Real-time feedback and customer satisfaction monitoring
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mb: 6 }}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
                        Latest Customer Feedback
                    </Typography>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
                    ) : (
                        <Grid container spacing={3}>
                            {allReviews.map((review) => (
                                <Grid item xs={12} key={review.id}>
                                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                                        <CardContent sx={{ p: 4 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>{review.userName[0]}</Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                            {review.userName}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Reviewed **{review.hotelName}**
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Rating value={review.rating} readOnly size="medium" />
                                                    <Typography variant="caption" display="block" color="text.secondary">
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Divider sx={{ my: 2 }} />
                                            <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#424242' }}>
                                                "{review.comment}"
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 3, p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'sticky', top: 24 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
                            Write a Review
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                select
                                fullWidth
                                label="Select Hotel"
                                value={selectedHotelId}
                                onChange={(e) => setSelectedHotelId(e.target.value)}
                                variant="outlined"
                            >
                                {hotels.map((hotel) => (
                                    <MenuItem key={hotel.id} value={hotel.id}>
                                        {hotel.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <ReviewForm hotelId={selectedHotelId} onSubmit={handleReviewSubmit} />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ReviewDashboardPage;
