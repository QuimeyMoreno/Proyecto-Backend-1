import { Router } from "express";
import { __dirname } from '../utils/dirname.js'; 
import ProductManagerMongo from "../daos/MONGO/productsManager.mongo.js";
import CartManagerMongo from "../daos/MONGO/cartsManager.mongo.js"; 


const router = Router();
const productService = new ProductManagerMongo();
const cartService = new CartManagerMongo();

router.get('/login', (req, res) => {
    res.status(200).render('login', {})
})
router.get('/register', (req, res) => {
    res.status(200).render('register', {})
})

router.get('/', async (req, res) => {
    const { page = 1, limit = 3 } = req.query;  
    try {
        const products = await productService.getProducts({
            limit: parseInt(limit),
            page: parseInt(page)
        });

        res.render("home", {
            products,  
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            totalPages: products.totalPages
        });
    } catch (error) {
        console.error('Error al leer los productos:', error);
        res.status(500).send('Error al cargar los productos');
    }
});

router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartService.getCartById(cid);  
        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }

        res.render('cart', { cart }); 
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).send('Error al cargar el carrito');
    }
});

router.get('/realtimeproducts', async (req, res) =>{
    res.render('realTimeProducts', {
        
    })
})



export default router;
