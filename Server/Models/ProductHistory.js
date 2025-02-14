const mongoose = require('mongoose');

const ProductHistorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product schema
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the seller (Business Owner or Farmer)
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the buyer (Business Owner or Farmer)
    required: false, // Optional for cases like stock updates
  },
  transactionType: {
    type: String,
    required: true,
    enum: ['sale', 'purchase', 'inventory update'], // Type of transaction
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
  totalAmount: {
    type: Number,
    required: true, // Calculated as quantity * pricePerUnit
  },
  transactionDate: {
    type: Date,
    default: Date.now, // Date of the transaction
  },
});

module.exports = mongoose.model('ProductHistory', ProductHistorySchema);
