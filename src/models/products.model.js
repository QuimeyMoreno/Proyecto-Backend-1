import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionName = "products";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  thumbnails: {
    type: [String],
  }
});

productSchema.plugin(mongoosePaginate);
const productModel = model(collectionName, productSchema);

export default productModel;