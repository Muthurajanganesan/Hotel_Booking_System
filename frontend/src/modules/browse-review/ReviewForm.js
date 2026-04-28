import React, { useState } from 'react';
import { Box, Typography, Rating, TextField, Button, Paper } from '@mui/material';

const ReviewForm = ({ hotelId, onSubmit }) => {
    const [review, setReview] = useState({
        rating: 0,
        comment: ''
    });

    const handleSubmit = () => {
        onSubmit({ ...review, hotelId });
        setReview({ rating: 0, comment: '' });
    };

    return (
        <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Leave a Review
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Typography component="legend" variant="body2" color="text.secondary">Rating</Typography>
                <Rating
                    name="rating"
                    value={review.rating}
                    onChange={(event, newValue) => {
                        setReview({ ...review, rating: newValue });
                    }}
                />
            </Box>
            <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Comment"
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!review.rating || !review.comment}
                sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#43a047' } }}
            >
                Submit Review
            </Button>
        </Paper>
    );
};

export default ReviewForm;
