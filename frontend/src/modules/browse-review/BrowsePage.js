import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBar from './SearchBar';
import HotelListCard from './HotelListCard';
import HotelCard from './HotelCard'; // This will act as RoomCard
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import hotelService from '../../services/hotelService';

const BrowsePage = () => {
    const [view, setView] = useState('hotels'); // 'hotels' or 'rooms'
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (view === 'hotels') {
            fetchHotels('');
        }
    }, [view]);

    const fetchHotels = async (location) => {
        setLoading(true);
        setError(null);
        try {
            const response = await hotelService.getHotels(location);
            setHotels(response.data);
        } catch (err) {
            setError("Failed to fetch hotels.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleViewRooms = async (hotel) => {
        setLoading(true);
        setError(null);
        try {
            const response = await hotelService.getRoomsByHotel(hotel.id);
            setRooms(response.data);
            setSelectedHotel(hotel);
            setView('rooms');
        } catch (err) {
            setError("Failed to fetch rooms for this hotel.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBackToHotels = () => {
        setView('hotels');
        setSelectedHotel(null);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {view === 'hotels' ? (
                <>
                    <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
                        Browse Hotels
                    </Typography>
                    <SearchBar onSearch={(filters) => fetchHotels(filters.location)} />
                    
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : (
                        <Box>
                            <Typography variant="body1" sx={{ mb: 2 }}>Showing {hotels.length} hotels</Typography>
                            {hotels.map(hotel => (
                                <HotelListCard key={hotel.id} hotel={hotel} onViewRooms={handleViewRooms} />
                            ))}
                        </Box>
                    )}
                </>
            ) : (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <IconButton onClick={handleBackToHotels} sx={{ mr: 2 }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                            Rooms at {selectedHotel.name}
                        </Typography>
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : rooms.length === 0 ? (
                        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', py: 8 }}>
                            No rooms available at this hotel.
                        </Typography>
                    ) : (
                        <Box>
                            {rooms.map(room => (
                                <HotelCard key={room.id} room={room} />
                            ))}

                            <Box sx={{ mt: 6 }}>
                                <ReviewList hotelId={selectedHotel.id} />
                                <Box sx={{ mt: 4 }}>
                                    <ReviewForm 
                                        hotelId={selectedHotel.id} 
                                        onSubmit={async (reviewData) => {
                                            try {
                                                await hotelService.addReview({
                                                    ...reviewData,
                                                    userId: 1 // Mock user ID for now
                                                });
                                                // Refresh page or trigger review list reload
                                                window.location.reload(); 
                                            } catch (err) {
                                                console.error("Failed to add review", err);
                                            }
                                        }} 
                                    />
                                </Box>
                            </Box>
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

export default BrowsePage;
