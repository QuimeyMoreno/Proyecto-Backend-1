import dotenv from 'dotenv';
import MongoSingleton from '../utils/mongoSingleton.js'; 

dotenv.config();

export const configObject = {
    port: process.env.PORT || 8080,
    private_key: process.env.PRIVATE_KEY
};

export const connectDB = async () => {
    return await MongoSingleton.getInstance();
};
