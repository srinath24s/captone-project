# Farmer E-commerce Server

This is the backend server for a Farmer E-commerce Application built using **Node.js**, **Express**, and **MongoDB**. It handles user authentication, product management, and other backend functionalities to support an online marketplace for farmers and buyers.

---

## 🔧 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for Node.js
- **Mongoose** – ODM for MongoDB
- **bcrypt** – Password hashing
- **jsonwebtoken (JWT)** – Token-based authentication
- **nodemon** – Development utility to auto-restart the server
- **dotenv** – Manage environment variables
- **uuid** – Generate unique identifiers

---

## 🚀 Features

- User Registration & Login (with hashed passwords)
- JWT Authentication & Authorization
- Product CRUD APIs
- MongoDB integration via Mongoose
- UUID-based IDs for resources
- Environment variable management
- Dev-friendly server restarts with nodemon

---

## 📁 Project Structure
├── config/ #  DB connection and config files
├── controllers/ # Logic for routes
├── middleware/ # Custom middlewares (auth, error handling)
├── models/ # Mongoose models
├── Routes/ # API route handlers
├── .env # Environment variables
├── server.js # Entry point
└── package.json


---

## 📦 Installation

1. **Clone the repository**

    git clone https://github.com/your-username/farmer-ecommerce-server.git
    cd farmer-ecommerce-server

2.  **Install dependencies**
        npm install

3. **Set up environment variables**

    Create a .env file in the root directory and add the following:
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key

4. **Start the development server**
    npm run dev