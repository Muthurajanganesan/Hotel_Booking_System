import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Rating, Divider, Stack } from '@mui/material';
import hotelService from '../../services/hotelService';

const ReviewList = ({ hotelId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const response = await hotelService.getReviews(hotelId);
                setReviews(response.data);
            } catch (err) {
                console.error("Failed to fetch reviews", err);
            } finally {
                setLoading(false);
            }
        };
        if (hotelId) fetchReviews();
    }, [hotelId]);

    if (loading) return <Typography>Loading reviews...</Typography>;

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                Customer Reviews ({reviews.length})
            </Typography>
            {reviews.length === 0 ? (
                <Typography color="text.secondary">No reviews yet for this hotel.</Typography>
            ) : (
                <Stack spacing={2}>
                    {reviews.map((review) => (
                        <Card key={review.id} variant="outlined" sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        {review.userName || 'Anonymous'}
                                    </Typography>
                                    <Rating value={review.rating} readOnly size="small" />
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    {review.comment}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default ReviewList;
