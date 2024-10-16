import { Schema, model } from "mongoose";

const collectionName = 'user';
const userSchema = new Schema({
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String
    },
    email:{
        type: String,
        require: true,
        unique: true
    }, 
    age: {
        type: Number
    },
    password: {
        type: String,
        require: true,
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        enum: ['user', 'user_premium', 'admin'],
        default: 'user'
    }
})

const userModel = model(collectionName, userSchema);
export default userModel;

