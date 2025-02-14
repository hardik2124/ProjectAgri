const express = require("express")
const router = express.Router()
const {sendOTP,login,signUp,getAllUsers,changePassword} = require("../Controller/Auth");
const {Auth} = require("../middleWare/Auth")
const {resetPasswordToken,resetPassword} = require("../Controller/ResetPassword");

router.post("/signup", signUp);
router.post("/login",login);
router.get("/users",getAllUsers);
router.post("/sendOTP",sendOTP);
router.post("/changePassword",Auth,changePassword);
router.post("/resetPasswordToken",resetPasswordToken);
router.post("/resetPassword",resetPassword);

module.exports = router