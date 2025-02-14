const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true, 
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            itemType: {
                type: String,
                required: true,
                enum: ["Crop", "Product"],
            },
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                refPath: "items.itemType",
            },
            itemName: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            pricePerUnit: {
                type: Number,
                required: true,
            },
            totalItemPrice: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0, // Sum of all `totalItemPrice` in the items array
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["cash", "credit card", "debit card", "UPI", "net banking"],
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    placedAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update the `updatedAt` field
OrderSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Order", OrderSchema);