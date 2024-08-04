const userModel = require("../../models/userModel");

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId;
        const { userId, name, email, role } = req.body;
        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        };

        const user = await userModel.findById(sessionUser);
        if (!user) {
            return res.status(404).json({
                message: "Session user not found",
                error: true,
                success: false
            });
        }

        console.log("user-role", user.role);

        const updatedUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                message: "User to be updated not found",
                error: true,
                success: false
            });
        }

        res.json({
            data: updatedUser,
            message: "User Updated",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;
