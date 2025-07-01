const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
   review: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
   book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  },
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;