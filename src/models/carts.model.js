import { Schema, model, mongoose } from "mongoose";
 

const collectionName = "carts";
const cartSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
