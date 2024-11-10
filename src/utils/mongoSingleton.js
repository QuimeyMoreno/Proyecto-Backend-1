import { connect } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

console.log('Mongo URL:', process.env.MONGO_URL); // Esto debe mostrar la URL de conexión

class MongoSingleton {
    static #instance;

    constructor() {
        connect(process.env.MONGO_URL)
            .then(() => console.log('Conexión a la base de datos exitosa'))
            .catch(error => console.error('Error al conectar la base de datos:', error));
    }

    static getInstance() {
        if (this.#instance) {
            console.log('Base de datos ya conectada');
            return this.#instance;
        }
        this.#instance = new MongoSingleton();
        return this.#instance;
    }
}

export default MongoSingleton;
