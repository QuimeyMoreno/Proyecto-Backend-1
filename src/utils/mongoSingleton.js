import { connect } from 'mongoose';

class MongoSingleton {
    static #instance;

    constructor() {
        connect(process.env.MONGO_URL)
            .then(() => console.log('Base de datos conectada'))
            .catch(err => console.error('Error al conectar a la base de datos', err));
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
