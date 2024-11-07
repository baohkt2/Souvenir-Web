const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true // Tạo index cho trường name
    },
    image: {
      type: String,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Giá không được âm']
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Số lượng trong kho không được âm']
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
