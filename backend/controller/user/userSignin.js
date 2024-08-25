const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false,
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false,
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        // Check password
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                message: "Incorrect password",
                error: true,
                success: false,
            });
        }

        // Determine auth type (default to 'jwt')
        const authType = req.query.authType || "jwt";

        // Option 1: Generate and set JWT token in cookie
        if (authType === "jwt") {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            // Set token in cookie
            const tokenOption = {
                httpOnly: true,
                //secure: true, // Ensure HTTPS is used
                sameSite: "None", // Required for cross-site cookies
            };
            

            return res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false,
            });
        }

        // Option 2: Store credentials in cookies (not recommended)
        if (authType === "credentials") {
            // Store email and password in cookies
            res.cookie("email", email, { httpOnly: true, secure: true, sameSite: "None" });
            res.cookie("password", password, { httpOnly: true, secure: true, sameSite: "None" });

            return res.status(200).json({
                message: "Login successfully",
                success: true,
                error: false,
            });
        }

        return res.status(400).json({
            message: "Invalid authType specified",
            error: true,
            success: false,
        });

    } catch (err) {
        console.error("Error in userSignInController:", err); // Log error to the console
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
