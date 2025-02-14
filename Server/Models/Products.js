const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['seeds', 'fertilizers', 'tools', 'pesticides', 'other'], // Example categories
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'g', 'l', 'ml', 'unit'], // Example units
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  netWeight: {
    type: Number,
    required: true,
    min: 0,
    // Unit: grams (g) or specify as needed
  },
  images: [
    {
      url: { type: String, required: true },
      altText: { type: String, required: false },
    },
  ],
  ratings: {
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review', // Reference to the Review model
    },
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

// Pre-save middleware to update `updatedAt` timestamp
ProductSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Products', ProductSchema);
