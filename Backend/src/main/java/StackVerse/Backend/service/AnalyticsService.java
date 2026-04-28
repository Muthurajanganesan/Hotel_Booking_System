package StackVerse.Backend.service;

import StackVerse.Backend.dto.AnalyticsDTO;

public interface AnalyticsService {
    AnalyticsDTO getRevenueAnalytics();
    AnalyticsDTO getOccupancyAnalytics();
}
