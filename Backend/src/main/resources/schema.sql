-- Users
CREATE TABLE IF NOT EXISTS Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('USER','MANAGER','ADMIN')
);

-- Hotels
CREATE TABLE IF NOT EXISTS Hotels (
  hotel_id INT PRIMARY KEY AUTO_INCREMENT,
  manager_id INT,
  name VARCHAR(100),
  location VARCHAR(100),
  description TEXT,
  image_url VARCHAR(255),
  status ENUM('PENDING','APPROVED','REJECTED'),
  FOREIGN KEY (manager_id) REFERENCES Users(user_id)
);

-- Rooms
CREATE TABLE IF NOT EXISTS Rooms (
  room_id INT PRIMARY KEY AUTO_INCREMENT,
  hotel_id INT,
  price DECIMAL(10,2),
  amenities TEXT,
  rating DECIMAL(3,2),
  availability BOOLEAN,
  FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id)
);

-- Bookings
CREATE TABLE IF NOT EXISTS Bookings (
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

-- Payments
CREATE TABLE IF NOT EXISTS Payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT,
  amount DECIMAL(10,2),
  status ENUM('PENDING','PAID','FAILED'),
  FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);

-- Reviews
CREATE TABLE IF NOT EXISTS Reviews (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  hotel_id INT,
  rating DECIMAL(3,2),
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id)
);

-- Promotions
CREATE TABLE IF NOT EXISTS Promotions (
  promo_id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(50),
  discount DECIMAL(5,2),
  description TEXT,
  valid_until DATE
);
