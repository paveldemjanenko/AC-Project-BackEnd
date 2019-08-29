import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, trim: true, unique: true, required: true },
    title: { type: String, trim: true, unique: false, required: true },
    media: {
      path: { type: String, unique: true, required: true },
    },
    price: { type: Number, trim: true, unique: false, required: true },
    company: { type: String, trim: true, unique: false, required: true },
    info: { type: String, trim: true, unique: false, required: true },
  }
);

const ProductModel = mongoose.model('Product', productSchema);

const getProductById = async _id => ProductModel.findById({ _id });

const getRandomProducts = async () => ProductModel.find();

export { getRandomProducts, getProductById };
