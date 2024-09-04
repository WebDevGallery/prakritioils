const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require("./routes");
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent with requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
}));

app.use(express.json());
app.use(cookieParser());

// Ensure secure cookies for SameSite=None
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use("/api", router);

const PORT = process.env.PORT || 80;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is listening on port ` + PORT);
    });
}).catch(err => {
    console.error("Failed to connect to DB:", err);
});
