const User = require("../Models/User");
const mailSender = require("../Utils/MailSender");
const bcrypt = require("bcryptjs");

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user dose not exist",
            });
        }

        const token = crypto.randomUUID().toString();

        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            {
                new: true,
            }
        );

        const url = `http://localhost:5173/reset-password/${token}`;

        await mailSender(email, "password reset link", `password reset link:${url}`);

        return res.status(200).json({
            success: true,
            message: "reset password link sent successfully",
        });
    } catch (e) {
        return res.status(403).json({
            success: false,
            message: "something went wrong while sending reset password mail !!",
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "both password is not same ",
            });
        }
        console.log(token);
        const userDetails = await User.findOne({ token: token });
        console.log('1');
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "invalid token",
            });
        }
        console.log('1');
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "link has been  expires",
            });
        }
        console.log('1');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('1');
        await User.findOneAndUpdate({ email: userDetails.email }, { password: hashedPassword }, { new: true });
        console.log('1');
        return res.status(200).json({
            success: true,
            message: "password reset successfully", 
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "error while reset password",
        });
    }
};
