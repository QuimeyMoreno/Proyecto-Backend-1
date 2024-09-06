import { Router } from "express";
import { __dirname } from '../utils/dirname.js'; 
import ProductManagerMongo from "../daos/MONGO/productsManager.mongo.js";

const router = Router();
const productService = new ProductManagerMongo();

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

router.get('/realtimeproducts', async (req, res) =>{
    res.render('realTimeProducts', {
        
    })
})



export default router;
