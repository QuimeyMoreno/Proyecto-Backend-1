import dotenv from 'dotenv';
import MongoSingleton from '../utils/mongoSingleton.js';



dotenv.config();

export const configObject = {
    port: process.env.PORT,
    private_key: process.env.PRIVATE_KEY,
};

console.log('MONGO_URL:', process.env.MONGO_URL);
console.log('PORT:', process.env.PORT);

export const connectDB = async () => {
    return await MongoSingleton.getInstance();
};
