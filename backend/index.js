const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db')
const router = require("./routes");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 80;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is listening on port `+ PORT);
    });
}).catch(err => {
    console.error("Failed to connect to DB:", err);
});
