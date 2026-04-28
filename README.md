# 🏨 Hotel Booking Website

## 📌 Overview
A full-stack hotel booking platform built with **React.js (frontend)**, **Spring Boot (backend)**, and **MySQL (database)**.  
Roles: **User, Manager, Admin**.  
Modules:  
1. User & Authentication  
2. Hotel & Room Management  
3. Browse, Search & Reviews  
4. Booking & Payments  
5. Admin Dashboard & Promotions  

---

## 👥 Roles
- **User**: Browse hotels/rooms, register/login, book/cancel rooms, leave reviews.  
- **Manager**: Submit hotel details, manage rooms, handle check-in/check-out, fines.  
- **Admin**: Approve/reject hotels, manage promotions, view analytics.  

---

## ⚙️ Functionalities
- JWT-based authentication & role management.  
- Hotel/room CRUD operations.  
- Search & filter by price, amenities, ratings, location.  
- Booking & payment integration.  
- Reviews & ratings.  
- Admin dashboard with analytics & promotions.  

---

## 🔗 API Endpoints

### User & Authentication
- `POST /auth/signup` → Register user  
- `POST /auth/login` → Login  
- `GET /users/{id}` → Get profile  
- `PUT /users/{id}` → Update profile  

### Hotel & Room
- `POST /manager/hotels` → Submit hotel  
- `PUT /manager/hotels/{id}` → Update hotel  
- `POST /manager/rooms` → Add room  
- `PUT /manager/rooms/{id}` → Update room  
- `DELETE /manager/rooms/{id}` → Remove room  
- `GET /hotels` → Browse hotels  
- `GET /hotels/{id}` → Hotel details  

### Browse, Search & Reviews
- `GET /rooms?filters` → Filter rooms  
- `GET /rooms/{id}` → Room details  
- `POST /reviews` → Add review  
- `GET /reviews/{hotelId}` → Get reviews  

### Booking & Payments
- `POST /bookings` → Book room  
- `GET /bookings/{id}` → Booking details  
- `DELETE /bookings/{id}` → Cancel booking  
- `POST /payments` → Make payment  
- `GET /payments/{id}` → Payment status  

### Admin Dashboard & Promotions
- `GET /admin/hotels/requests` → View pending requests  
- `PUT /admin/hotels/{id}/approve` → Approve hotel  
- `PUT /admin/hotels/{id}/reject` → Reject hotel  
- `DELETE /admin/hotels/{id}` → Remove hotel  
- `GET /analytics/revenue` → Revenue stats  
- `GET /analytics/occupancy` → Occupancy stats  
- `POST /promotions` → Add promotion  
- `GET /promotions` → View promotions  

---

## 🗄️ Database Schema (MySQL)

```sql
CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('USER','MANAGER','ADMIN')
);

CREATE TABLE Hotels (
  hotel_id INT PRIMARY KEY AUTO_INCREMENT,
  manager_id INT,
  name VARCHAR(100),
  location VARCHAR(100),
  description TEXT,
  image_url VARCHAR(255),
  status ENUM('PENDING','APPROVED','REJECTED'),
  FOREIGN KEY (manager_id) REFERENCES Users(user_id)
);

CREATE TABLE Rooms (
  room_id INT PRIMARY KEY AUTO_INCREMENT,
  hotel_id INT,
  price DECIMAL(10,2),
  amenities TEXT,
  rating DECIMAL(3,2),
  availability BOOLEAN,
  FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id)
);

CREATE TABLE Bookings (
  booking_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  room_id INT,
  checkin_date DATETIME,
  checkout_date DATETIME,
  status ENUM('BOOKED','CANCELLED','COMPLETED'),
  fine DECIMAL(10,2) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (room_id) REFERENCES Rooms(room_id)
);

CREATE TABLE Payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT,
  amount DECIMAL(10,2),
  status ENUM('PENDING','PAID','FAILED'),
  FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);

CREATE TABLE Reviews (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  hotel_id INT,
  rating DECIMAL(3,2),
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id)
);

CREATE TABLE Promotions (
  promo_id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(50),
  discount DECIMAL(5,2),
  description TEXT,
  valid_until DATE
);
