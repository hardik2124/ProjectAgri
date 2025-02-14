const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        LastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: false,
        },
        accountType: {
            type: String,
            enum: ["farmer", "agroowner","visitor"],
            required: true,
        },
        address: {
            street: { type: String, required: false },
            city: { type: String, required: false },// make it enum
            state: { type: String, required: false },
            zipCode: { type: String, required: false },
            country: { type: String, required: false },
        },
        businessDetails: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AgroDetails3",
            },
        ],
        PurchasedProduct:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"product"
            }
        ],
        image:{
            type:String,
        },
        token:{
            type:String,

        },
        resetPasswordExpires:{
            type:Date,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt:{
            type: Date,
        }
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("User", userSchema);
