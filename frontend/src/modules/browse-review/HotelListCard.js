import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const HotelListCard = ({ hotel, onViewRooms }) => {
    return (
        <Card sx={{ display: 'flex', mb: 3, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <CardMedia
                component="img"
                sx={{ width: 240, objectFit: 'cover' }}
                image={hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                alt={hotel.name}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#212121', mb: 1 }}>
                        {hotel.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 2 }}>
                        <LocationOnIcon sx={{ fontSize: 18, mr: 0.5, color: '#1976d2' }} />
                        <Typography variant="body2">{hotel.location}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {hotel.description}
                    </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        variant="contained" 
                        onClick={() => onViewRooms(hotel)}
                        sx={{ borderRadius: 2, px: 4, bgcolor: '#1976d2' }}
                    >
                        View Rooms
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default HotelListCard;
