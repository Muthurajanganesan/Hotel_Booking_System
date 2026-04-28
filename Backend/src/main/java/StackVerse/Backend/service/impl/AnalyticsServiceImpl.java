package StackVerse.Backend.service.impl;

import StackVerse.Backend.dto.AnalyticsDTO;
import StackVerse.Backend.entity.Booking;
import StackVerse.Backend.repository.BookingRepository;
import StackVerse.Backend.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public AnalyticsDTO getRevenueAnalytics() {
        List<Booking> completedBookings = bookingRepository.findByStatus(Booking.Status.COMPLETED);
        BigDecimal totalRevenue = completedBookings.stream()
                .map(b -> b.getTotalAmount() != null ? b.getTotalAmount() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new AnalyticsDTO(totalRevenue, null, (long) completedBookings.size(), "All Time");
    }

    @Override
    public AnalyticsDTO getOccupancyAnalytics() {
        List<Booking> allBookings = bookingRepository.findAll();
        long bookedCount = allBookings.stream().filter(b -> b.getStatus() == Booking.Status.BOOKED).count();
        
        // Mock calculation for occupancy rate assuming 100 total rooms for simplicity
        long totalMockRooms = 100L;
        double occupancyRate = (double) bookedCount / totalMockRooms * 100;

        return new AnalyticsDTO(null, occupancyRate, (long) allBookings.size(), "Current");
    }
}
