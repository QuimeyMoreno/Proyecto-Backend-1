import express from 'express';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewsRouter from "./routes/views.router.js";
import handlebars from 'express-handlebars';
import { __dirname } from './utils/dirname.js';
import { Server } from 'socket.io';
import fs from 'fs/promises';


const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log('escuchando en el puerto: ', PORT)
})

const socketServer = new Server(httpServer)


socketServer.on('connection', socket => {
    console.log("Cliente conectado");

    socket.on('getProducts', async () => {
        const data = await fs.readFile(`${__dirname}/../../dbjson/productsDb.json`, 'utf-8');
        const products = JSON.parse(data);
        socket.emit('updateProducts', products);
    });

    socket.on('createProduct', async (newProduct) => {
        const data = await fs.readFile(`${__dirname}/../../dbjson/productsDb.json`, 'utf-8');
        const products = JSON.parse(data);

        newProduct.id = 
        products.push(newProduct);

        await fs.writeFile(`${__dirname}/../../dbjson/productsDb.json`, JSON.stringify(products, null, 2));
        socketServer.emit('updateProducts', products); 
    });

    socket.on('deleteProduct', async (productId) => {
        const data = await fs.readFile(`${__dirname}/../../dbjson/productsDb.json`, 'utf-8');
        let products = JSON.parse(data);

        products = products.filter(product => product.id !== productId);

        await fs.writeFile(`${__dirname}/../../dbjson/productsDb.json`, JSON.stringify(products, null, 2));
        socketServer.emit('updateProducts', products); 
    });
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/../public'));




app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars')


app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

