import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    availibility: {
      type: String,
      required: true,
    },
    description: String,
    
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
