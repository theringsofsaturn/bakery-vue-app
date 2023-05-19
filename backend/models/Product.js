import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    ingredients: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: false,
    },
    sku: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', ProductSchema);
