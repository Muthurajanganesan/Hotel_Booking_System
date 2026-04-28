import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Rating, Button, Stack, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const HotelCard = ({ room }) => {
    return (
        <Card sx={{ display: 'flex', mb: 3, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <CardMedia
                component="img"
                sx={{ width: 240, objectFit: 'cover' }}
                image={room.hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                alt={room.hotel.name}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#212121' }}>
                                {room.hotel.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mt: 0.5 }}>
                                <LocationOnIcon sx={{ fontSize: 18, mr: 0.5, color: '#1976d2' }} />
                                <Typography variant="body2">{room.hotel.location}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                                ${room.price}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">per night</Typography>
                        </Box>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ my: 2 }}>
                        {room.amenities.split(',').map((amenity, index) => (
                            <Chip key={index} label={amenity.trim()} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                        ))}
                    </Stack>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={room.rating} precision={0.5} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium' }}>
                            {room.rating}
                        </Typography>
                    </Box>
                </CardContent>
                <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" sx={{ borderRadius: 2, px: 4, bgcolor: '#1976d2' }}>
                        View Details
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default HotelCard;
