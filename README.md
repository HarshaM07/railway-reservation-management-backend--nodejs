# Railway Management System

## Overview

This is a Railway Management System API developed to manage trains, seat availability, and bookings. The API allows users to register, log in, check train seat availability, book seats, and get booking details. Admins have additional privileges to add trains and update seat availability.

## Features

- **User Registration**: Register a new user.
- **User Login**: Log in to your account.
- **Add New Train**: Admins can add new trains.
- **Get Seat Availability**: Check available trains and seats between two stations.
- **Book a Seat**: Book a seat on a specific train.
- **Get Booking Details**: Retrieve details of your bookings.

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Variables**: Managed with `.env`

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MySQL server running and configured.

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/HarshaM07/railway-reservation-management-backend--nodejs.git
    cd railway-reservation-management-backend--nodejs
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    PORT=5000
    JWT_SECRET=your_jwt_secret
    ADMIN_API_KEY=your_admin_api_key
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=root
    DB_NAME=railway_management
    ```

    Replace the placeholders with your actual database credentials and secret keys.

4. **Run database migrations:**

    Ensure your MySQL database is set up according to the schema. You may need to create the required tables manually or through migration scripts.

5. **Start the server:**

    ```sh
    npm start
    ```

    The server will run on `http://localhost:5000`.

## API Endpoints

### User Registration

- **POST** `/api/auth/register`
- **Body**: `{ "username": "user", "password": "password", "role": "user" }`
- **Response**: `{ "message": "User registered successfully" }`

### User Login

- **POST** `/api/auth/login`
- **Body**: `{ "username": "user", "password": "password" }`
- **Response**: `{ "token": "jwt_token" }`

### Add New Train (Admin Only)

- **POST** `/api/trains/add-train`
- **Headers**: `Authorization: Bearer admin_jwt_token`, `API_KEY: admin_api_key`
- **Body**: `{ "train_name": "Express", "source": "City A", "destination": "City B", "total_seats": 100 }`
- **Response**: `{ "message": "Train added successfully" }`

### Get Seat Availability

- **GET** `/api/trains/availability`
- **Query Params**: `source`, `destination`
- **Response**: `[{ "train_id": 1, "source": "City A", "destination": "City B", "available_seats": 20 }]`

### Book a Seat

- **POST** `/api/bookings/book-seat`
- **Headers**: `Authorization: Bearer user_jwt_token`
- **Body**: `{ "train_id": 1, "seats": 1 }`
- **Response**: `{ "message": "Booking successful" }`

### Get Booking Details

- **GET** `/api/bookings/details`
- **Headers**: `Authorization: Bearer user_jwt_token`
- **Response**: `[{ "booking_id": 1, "train_id": 1, "seats": 1, "status": "confirmed" }]`

## Running Tests

If you have tests, you can run them using:

```sh
npm test
