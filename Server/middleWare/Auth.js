const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Auth = async (req, res, next) => {
    try {


        // Attempt to get token from body or cookies
        let token = req.body?.token || req.cookies?.token || req.header("Authorization")?.replace(/^Bearer\s+/i, "");


        // If not found, attempt to extract it from the Authorization header safely
        // const authHeader = req.header("Authorization");
        // if (!token && authHeader) {
        //     // Remove 'Bearer ' prefix in a case-insensitive manner using regex
        //     token = authHeader.replace(/^Bearer\s+/i, "");
        // }


        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
            console.log(req.user);
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            });
        }

        next();
    } catch (e) {
        console.error("Auth Middleware Error:", e);
        console.log("request aaii");
        return res.status(403).json({
            success: false,
            message: "Something Went Wrong While Validating the Token",
        });
    }
};

exports.isFarmer = async (req, res, next) => {
    try {

        if (req.user.accountType !== "farmer") {
            return res.status(403).json({
                success: false,
                message: "this is a protected route for Farmers",
            });
        }

        next();
    } catch (e) {
        return res.status(403).json({
            success: false,
            message: "user role can not verified",
        });
    }
};

exports.isAgroOwner = async (req, res, next) => {
    try {

        if (req.user.accountType !== "agroowner") {
            return res.status(403).json({
                success: false,
                message: "this is a protected route for Agro Owner",
            });
        }

        next();
    } catch (e) {
        return res.status(403).json({
            success: false,
            message: "user role can not be verified",
        });
    }
};

exports.isVisitor = async (req, res, next) => {
    try {

        if (req.user.accountType !== "visitor") {
            return res.status(403).json({
                success: false,
                message: "this is a protected route for visitor",
            });
        }

        next();
    } catch (e) {
        return res.status(403).json({
            success: false,
            message: "user role can not be verified",
        });
    }
};


exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType === "visitor") {
            return res.status(403).json({
                success: false,
                message: "this is a protected route for Farmers and Agro Owners",
            });
        }

        next();

    } catch (e) {
        return res.status(403).json({
            success: false,
            message: "user role can not be verified",
        });
    }
}