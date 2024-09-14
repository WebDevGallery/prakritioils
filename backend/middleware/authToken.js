require('dotenv').config();
const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Retrieve the token from cookies or Authorization header
        const token = req.cookies?.token || req.headers['authorization'];

        if (!token) {
            return res.status(401).json({
                message: "Authentication required. Please login.",
                error: true,
                success: false,
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                console.error("JWT verification error: ", err);
                return res.status(403).json({
                    message: "Invalid or expired token. Please login again.",
                    error: true,
                    success: false,
                });
            }

            // Set the user ID in the request object for further use
            req.userId = decoded._id;

            // Proceed to the next middleware
            next();
        });

    } catch (err) {
        console.error("Error in authToken middleware: ", err);
        res.status(500).json({
            message: "Internal Server Error",
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;
