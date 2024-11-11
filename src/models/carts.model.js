import { Schema, model } from "mongoose";

const collectionName = "carts";
const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId, 
                ref: 'products', 
                require: true
            }, 
            quantity: {
                type: Number, 
                required: true
            }
        }
    ]
})

const cartModel = model(collectionName, cartSchema);

export default cartModel;
