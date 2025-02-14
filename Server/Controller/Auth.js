const OTP = require("../Models/Otp");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../Utils/sendVerificationEmail");
const { passwordUpdated } = require("../Templates/updatedPassword");
require("dotenv").config();
const otpgenerator = require("otp-generator");
const mailSender = require("../Utils/MailSender");

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user is already registered
        const CheckUserPresent = await User.findOne({ email });
        if (CheckUserPresent) {
            return res.status(401).json({
                success: false,
                message: `User already registered`,
            });
        }

        // Generate unique OTP
        let Otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        console.log("Generated OTP:", Otp);

        // Ensure OTP uniqueness
        let checkOtp = await OTP.findOne({ otp: Otp });
        while (checkOtp) {
            Otp = otpgenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            checkOtp = await OTP.findOne({ otp: Otp });
        }

        // Create OTP record in the database
        const otpPayload = { email, otp: Otp };
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP record created:", otpBody);

        await sendVerificationEmail(email, Otp);

        return res.status(200).json({
            success: true,
            message: `OTP sent successfully`,
            Otp,
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: `Error while sending OTP: ${e.message}`,
        });
    }
};

// exports.signUp = async (req, res) => {
//     try {
//         const { firstName, lastName, email, password, confirmPassword, contactNo, accoutType, otp, address } = req.body;

//         if (!firstName || !lastName || !email || !password || !confirmPassword || !otp || !accoutType || !contactNo ) {
//             return res.status(500).json({
//                 success: false,
//                 message: `all fields are required`,
//             });
//         }

//         if (password !== confirmPassword) {
//             return res.status(500).json({
//                 success: false,
//                 message: `password and confirm password dose not equal`,
//             });
//         }

//         const existingUser = await User.findOne({ email });
//         console.log("existing user : ", existingUser);
//         if (existingUser) {
//             return res.status(401).json({
//                 success: false,
//                 message: `user already exists`,
//             });
//         }

//         const recentOtp = await OTP.findOne({ email:email }).sort({ createdAt: -1 }).limit(1);
//         console.log("recent otp : ", recentOtp.otp);

//         // if (recentOtp.otp.length == 0) {
//         //     return res.status(400).json({
//         //         success: false,
//         //         message: "no otp found",
//         //     });
//         // }
//         console.log("recent otp : ", recentOtp.otp);
//         console.log("otp : ", otp);

//         if (recentOtp.otp !== otp) {
//             return res.status(400).json({
//                 success: false,
//                 message: "invalid otp",
//             });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);

//         //add logic of agroOwen details here

//         const user = await User.create({
//             firstName: firstName,
//             LastName: lastName,
//             email: email,
//             password: hashedPassword,
//             contactNumber: contactNo,
//             accountType: accoutType,
//             address: address,
//             image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
//         });

//         return res.status(200).json({
//             success: true,
//             message: "user add successfully",
//             user,
//         });
//     } catch (e) {
//         console.log(e);
//         return res.status(400).json({
//             success: false,
//             message: `user can not register successfully, please try again ` + e.message,
//         });
//     }
// };


exports.signUp = async (req, res) => {
    try {
        console.log("sign up .....................................");
        const { firstName, lastName, email, password, confirmPassword, accountType, otp, } = req.body; //address

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp ) { //accountType
            return res.status(500).json({
                success: false,
                message: `All fields are required`,
            });
        }
        console.log("stage 2")

        if (password !== confirmPassword) {
            return res.status(500).json({
                success: false,
                message: `Password and confirm password do not match`,
            });
        }
        console.log("stage 3")

        const existingUser = await User.findOne({ email });
        console.log("Existing user: ", existingUser);
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: `User already exists`,
            });
        }
        console.log("stage 4")

        // const recentOtp = await OTP.findOne({ email: email }).sort({ createdAt: -1 }).limit(1);

        const recentOtp = await OTP.findOne({ email: email }).sort({ createdAt: -1 }).limit(1);

        // Handle the case where no OTP is found
        if (!recentOtp) {
            return res.status(400).json({
                success: false,
                message: "No OTP found",
            });
        }

        console.log("Recent OTP: ", recentOtp.otp);
        console.log("Provided OTP: ", otp);

        if (recentOtp.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword);
        console.log(accountType);
        // Add logic of agroOwen details here

        const user = await User.create({
            firstName: firstName,
            LastName: lastName,
            email: email,
            password: hashedPassword,
            // contactNumber: contactNo,
            accountType: accountType,
            address: null,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
        });
        console.log("User added successfully:", user);

        if (user) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "5h",
            });
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "sign in successful",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "User cannot register successfully, please try again",
            });

        }

        // return res.status(200).json({
        //     success: true,
        //     message: "User added successfully",
        //     user,
        // });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            success: false,
            message: `User cannot register successfully, please try again. Error: ` + e.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "all fields are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not registered",
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "5h",
            });
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "login successfully",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "password is incorrect",
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "login failure, please try again =>" + e.message,
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { email, password, newPassword, confirmNewPassword } = req.body;

        if (!password || !newPassword || !confirmNewPassword) {
            return res.status(401).json({
                success: false,
                message: "all fields are required",
            });
        }

        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user dose not found",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "old password is not correct",
            })
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await User.findByIdAndUpdate(user.id, { password: encryptedPassword }, { new: true });

        try {
            const emailResponse = await mailSender(updatedUser.email, "password for your account has been updated", passwordUpdated(updatedUser.email, `Password updated successfully for ${updatedUser.firstName} ${updatedUser.LastName}`))
            console.log("Email sent successfully:", emailResponse.response);
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: "error while send updated password email",
                error: e.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "password updated successfully"
        })


    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "error while changing password, please try again ",
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            users,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "error while getting users, please try again ",
        });
    }
};
