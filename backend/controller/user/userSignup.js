const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name) throw "Please provide name";
        if (!email) throw "Please provide email";
        if (!password) throw "Please provide password";

        const user = await userModel.findOne({ email });
        if (user) throw "User already exists";

        const hashPassword = await bcrypt.hash(password, 10);
        if (!hashPassword) throw "Something went wrong";

        const payload = {
            name,
            email,
            role: "GENERAL",
            password: hashPassword
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        console.log("User saved:", saveUser); // Log the saved user

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created Successfully"
        });
    } catch (err) {
        console.error("Error in userSignUpController:", err); // Log any errors
        res.status(500).json({
            message: err || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
