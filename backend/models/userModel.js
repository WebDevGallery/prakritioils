const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    role: String,
    resetPasswordToken: String,
    resetPasswordExpiry: Date
}, {
    timestamps: true
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
