import { Router } from "express";
import { __dirname } from '../utils/dirname.js'; 
import ProductManagerMongo from "../daos/MONGO/productsManager.mongo.js";

import checkAdminRole from "../middleware/checkAdminRole.js";
import passportCall from "../middleware/passportCall.js";


const router = Router();
const productService = new ProductManagerMongo();


router.get('/login', (req, res) => {
    res.status(200).render('login', {})
})
router.get('/register', (req, res) => {
    res.status(200).render('register', {})
})

router.get('/', async (req, res) => {
    const { page = 1, limit = 3 } = req.query;  
    try {
        const products = await productService.get({
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



router.get('/realtimeproducts', passportCall('jwt'), checkAdminRole, async (req, res) =>{
    res.render('realTimeProducts', {
        
    })
})



export default router;
