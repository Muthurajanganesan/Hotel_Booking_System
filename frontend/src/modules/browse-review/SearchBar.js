import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
        minRating: '',
        amenities: ''
    });

    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        let error = "";
        if (value !== "") {
            const num = parseFloat(value);
            if (name === 'minPrice' && num < 1000) error = "Must be at least 1000";
            if (name === 'maxPrice' && num < 2000) error = "Must be at least 2000";
            if (name === 'minRating' && (num < 1 || num > 10)) error = "Must be between 1-10";
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Prevent negative values immediately
        if ((name === 'minPrice' || name === 'maxPrice' || name === 'minRating') && value !== '' && parseFloat(value) < 0) return;

        const error = validate(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const isInvalid = () => {
        const e = {
            minPrice: validate('minPrice', filters.minPrice),
            maxPrice: validate('maxPrice', filters.maxPrice),
            minRating: validate('minRating', filters.minRating)
        };
        return !!(e.minPrice || e.maxPrice || e.minRating);
    };

    const handleSearch = () => {
        if (!isInvalid()) {
            onSearch(filters);
        }
    };

    return (
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        name="location"
                        label="Location"
                        placeholder="e.g. Paris"
                        value={filters.location}
                        onChange={handleChange}
                        variant="outlined"
                        size="medium"
                        sx={{ bgcolor: 'white' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        fullWidth
                        name="minPrice"
                        label="Min Price"
                        type="number"
                        placeholder="1000+"
                        value={filters.minPrice}
                        onChange={handleChange}
                        error={!!errors.minPrice}
                        helperText={errors.minPrice}
                        variant="outlined"
                        size="medium"
                        sx={{ bgcolor: 'white' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        fullWidth
                        name="maxPrice"
                        label="Max Price"
                        type="number"
                        placeholder="2000+"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        error={!!errors.maxPrice}
                        helperText={errors.maxPrice}
                        variant="outlined"
                        size="medium"
                        sx={{ bgcolor: 'white' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        fullWidth
                        name="minRating"
                        label="Min Rating"
                        type="number"
                        placeholder="1-10"
                        value={filters.minRating}
                        onChange={handleChange}
                        error={!!errors.minRating}
                        helperText={errors.minRating}
                        variant="outlined"
                        size="medium"
                        sx={{ bgcolor: 'white' }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<SearchIcon />}
                        onClick={handleSearch}
                        disabled={isInvalid()}
                        sx={{ height: 56, borderRadius: 2, textTransform: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}
                    >
                        SEARCH
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SearchBar;
