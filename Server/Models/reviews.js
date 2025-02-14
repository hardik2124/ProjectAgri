const mongoose = require('mongoose');
const Product = require('./Product'); // Import the Product model

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products', // Reference to the Product model
    required: true,
    index: true, // Improves search performance
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
    index: true, // Improves search performance
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Ratings range from 1 to 5
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Post middleware to update average rating of the product
ReviewSchema.post('save', async function (doc, next) {
  try {
    const product = await Product.findById(doc.product).populate('reviews');
    
    if (product.reviews.length > 0) {
      const totalRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0);
      product.ratings.averageRating = totalRatings / product.reviews.length;
      product.ratings.numberOfRatings = product.reviews.length;
    } else {
      product.ratings.averageRating = 0;
      product.ratings.numberOfRatings = 0;
    }

    await product.save();
  } catch (error) {
    console.error('Error updating product rating:', error);
  }
  next();
});

module.exports = mongoose.model('Review', ReviewSchema);
