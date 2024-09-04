const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require("./routes");
const cookieParser = require('cookie-parser');

const app = express();

// CORS middleware to handle cross-origin requests
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from your frontend domain
    credentials: true, // Allow cookies to be sent with cross-origin requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
}));

app.use(express.json());
app.use(cookieParser());

// Set secure cookies and handle CORS properly
app.use((req, res, next) => {
    // Handle secure cookies for cross-site requests (make sure this is HTTPS in production)
    res.cookie('token', 'someValue', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure cookies are secure in production
        sameSite: 'None', // Allows cross-origin cookies
    });
    next();
});

// Use the router for API routes
app.use("/api", router);

// Connect to the database and start the server
const PORT = process.env.PORT || 80;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is listening on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to DB:", err);
});
