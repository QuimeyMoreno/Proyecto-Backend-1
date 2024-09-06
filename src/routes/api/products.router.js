import { Router } from "express";
import ProductManagerMongo from "../../daos/MONGO/productsManager.mongo.js"


const router = Router();
const productService = new ProductManagerMongo();

router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query; 
    try {
        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { title: { $regex: query, $options: 'i' } },  
                    { description: { $regex: query, $options: 'i' } }  
                ]
            };
        }
        let sortOption = {};
        if (sort === 'asc') {
            sortOption = { price: 1 };  
        } else if (sort === 'desc') {
            sortOption = { price: -1 };  
        }
        const products = await productService.getProducts({
            filter,
            limit: parseInt(limit),
            page: parseInt(page),    
            sortOption
        });

        const prevLink = products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null;
        const nextLink = products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null;
        
        
        res.send({
            status: 'success',
            payload: products,   
            totalDocs: products.totalDocs,  
            totalPages: products.totalPages, 
            page: products.page,       
            limit: products.limit,     
            hasPrevPage: products.hasPrevPage, 
            hasNextPage: products.hasNextPage, 
            prevLink,  
            nextLink  
        });
    } catch (error) {
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
});

router.get('/:pid', async (req, res) =>{
    let id = req.params.pid;
    try {
        const product = await productService.getProductById(id);

        if(!product){
            return res.status(404).send({status: 'error', mensaje: 'Producto no encontrado'});
        }
        res.send({status: 'success', data: product});

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
})

router.post('/', async (req, res) =>{
    const newProduct = req.body;

    try {
        await productService.createProduct(newProduct);
        res.status(201).json({ message: "Producto agregado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
})

router.put('/:pid', async (req, res) =>{
    const updateFields = req.body
    const id = req.params.pid;

    try {
        await productService.updateProduct(id, updateFields);
        res.json("El producto se actualizo correctamente.")
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
})

router.delete('/:pid', async (req, res) =>{
    const id = req.params.pid;

    try {
        await productService.deleteProduct(id);
        res.json("El producto se elimino correctamente.")
    } catch (error) {
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
})

export default router;