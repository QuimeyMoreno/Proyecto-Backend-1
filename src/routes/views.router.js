import { Router } from "express";
import fs from 'fs/promises'; 
import { __dirname } from '../utils/dirname.js'; 

const router = Router();

router.get('/', async (req, res) => {
    try {
        
        const data = await fs.readFile(`${__dirname}/../../dbjson/productsDb.json`, 'utf-8');
        const products = JSON.parse(data);

        const userLogin = {
            full_name: 'Quimey Moreno',
            role: 'admin'
        };

        res.render('home', {
            name: "Quimey",
            title: "HOME - Ecomerce",
            products, 
            isAdmin: userLogin.role === 'admin'
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
