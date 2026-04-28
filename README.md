# Hotel Booking System

This repository contains both the frontend and backend of the Hotel Booking System.

## Folder Structure

```
HotelBooking/
├── Backend/                 # Spring Boot Backend
│   ├── src/main/java/StackVerse/Backend/
│   │   ├── config/          # Configuration classes
│   │   ├── controller/      # API Controllers
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entity/          # Database Entities
│   │   ├── repository/      # Data Repositories
│   │   └── service/         # Business Logic Services
│   └── src/main/resources/  # Application properties and resources
└── frontend/                # React Frontend
    ├── public/              # Static assets
    └── src/
        ├── component/       # Shared React components
        ├── modules/         # Feature-specific modules
        │   ├── admin/       # Admin Dashboard
        │   ├── auth/        # Authentication
        │   ├── booking/     # Booking management
        │   └── payment/     # Payment processing
        └── service/         # API services
```
