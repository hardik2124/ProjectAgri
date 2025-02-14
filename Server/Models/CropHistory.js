const mongoose = require("mongoose");

const CropHistorySchema = new mongoose.Schema({
    cropId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crop", // Reference to the Crop
        required: true,
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the Farmer
        required: true,
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the Buyer (Business owner or farmer)
        required: true,
    },
    quantityAddOrSell: {
        type: Number,
        required: true,
        min: 1, // Quantity in kilograms or units
    },
    pricePerUnit: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['cash', 'credit card', 'debit card', 'UPI', 'net banking'],
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("CropHistory", CropHistorySchema);
