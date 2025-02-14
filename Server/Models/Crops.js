const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CropSchema = new Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the Farmer
    required: true,
  },
  cropName: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['vegetable', 'fruit', 'grain', 'legume', 'other'], // Crop types
  },
  images: [
    {
      url: { type: String, required: true },
      altText: { type: String, required: false },
    },
  ],
  quantity: {
    type: Number,
    required: true,
    min: 0, // Quantity in kilograms or units
  },
  expiryDate: {
    type: Date,
    required: false, // Optional for crops with a shelf life
  },
  description: {
    type: String,
    required: false, // Optional additional details
  },
  CropHistory:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CropHistory',
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field
CropSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Crop', CropSchema);
