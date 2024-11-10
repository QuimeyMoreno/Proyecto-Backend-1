import express from 'express';
import productRouter from './routes/api/products.router.js'
import cartRouter from './routes/api/carts.router.js'
import viewsRouter from "./routes/views.router.js";
import userRouter from "./routes/api/session.router.js"
import handlebars from 'express-handlebars';
import { __dirname } from './utils/dirname.js';
import { Server } from 'socket.io';
import { connectDB } from './config/index.js';
import ProductManagerMongo from './daos/MONGO/productsManager.mongo.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './middleware/passport.config.js';


const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log('escuchando en el puerto: ', PORT)
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/../public'));
//cookie
app.use(cookieParser('palabrasecreta'))
//pasport-jwt

initializePassport();
app.use(passport.initialize())

connectDB();


app.engine('handlebars', handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars')


//Rutas
app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/sessions', userRouter);




//Web Socket
const productService = new ProductManagerMongo();
const io = new Server(httpServer)


io.on('connection', (socket) => {
    console.log("Cliente conectado");

    socket.on('getProducts', async () => {
        try {
            const products = await productService.get();
            socket.emit('updateProducts', products.docs || products);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    });

    socket.on('createProduct', async (newProduct, userRole) => {
        if (!userRole || userRole !== 'admin') {
            return socket.emit('errorMessage', 'No tienes permiso para crear productos');
        }
        try {
            await productService.create(newProduct);
            const updatedProducts = await productService.get();
            io.emit('updateProducts', updatedProducts.docs || updatedProducts);
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    });

    socket.on('updateProduct', async (productId, updateFields, userRole) => {
        if (!userRole || userRole !== 'admin') {
            return socket.emit('errorMessage', 'No tienes permiso para actualizar productos');
        }
        try {
            await productService.update(productId, updateFields);
            const updatedProducts = await productService.get();
            io.emit('updateProducts', updatedProducts.docs || updatedProducts);
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    });

    socket.on('deleteProduct', async (productId, userRole) => {
        if (!userRole || userRole !== 'admin') {
            return socket.emit('errorMessage', 'No tienes permiso para eliminar productos');
        }
        try {
            await productService.delete(productId);
            const updatedProducts = await productService.get();
            io.emit('updateProducts', updatedProducts.docs || updatedProducts);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    });
});


