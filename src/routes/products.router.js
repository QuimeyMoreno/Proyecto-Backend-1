import { Router } from "express";   
import ProductsManagerFs from "../managers/FileSystem/products.manager.js";


const router = Router();

const productsManagerFs = new ProductsManagerFs();

router.get('/', async (req, res) =>{
    try {
        const limit = req.query.limit;
        const productsDb = await productsManagerFs.getProducts();

        if(!limit){
            return res.send({status:'succes', data:productsDb});
        }
        if(isNaN(limit)){
            return res.send({status:'succes', data:productsDb});
        }

        const productsLimit = productsDb.slice(0,limit);
        res.send({status:'succes', data: productsLimit})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
})

router.get('/:pid', async (req, res) =>{
    try {
        const id = req.params.pid;
        const productsDb = await productsManagerFs.getProducts();
        const product = productsDb.find(product => product.id === id);

        if(!product){
            return res.status(404).send({status: 'error', mensaje: 'Producto no encontrado'});
        }
        res.send({status: 'success', data: product});
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
})


router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, thumbnails } = req.body;

        if (!title || !description || !code || !price || status === undefined || !stock || thumbnails === undefined) {
            return res.status(400).send({ status: 'error', mensaje: 'Faltan parámetros obligatorios' });
        }

        const productsDb = await productsManagerFs.getProducts();
        const existingProduct = productsDb.find(product => product.code === code);

        if (existingProduct) {
            return res.status(400).send({ status: 'error', mensaje: 'El código de producto ya está en uso' });
        }

        const newProduct = { title, description, code, price, status, stock, thumbnails };
        const response = await productsManagerFs.createProducts(newProduct);

        res.send({ status: 'success', data: response });

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
});



router.put('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const { id: _, ...updateFields } = req.body;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send({ status: 'error', mensaje: 'No se proporcionaron campos para actualizar' });
        }

        const response = await productsManagerFs.updateProduct(id, updateFields);

        if (response) {
            res.send({ status: 'success', mensaje: 'Producto actualizado correctamente', data: response });
        } else {
            res.status(404).send({ status: 'error', mensaje: 'El producto no pudo actualizarse' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
});


router.delete('/:pid', async (req, res) =>{
       try {
        const id = req.params.pid;
        const updateFields = req.body;

        if (updateFields.id) {
            delete updateFields.id;
        }

        const response = await productsManagerFs.deleteProduct(id, updateFields)
        if (response) {
            res.send({ status: 'success', mensaje: 'Producto eliminado correctamente' });
        } else {
            res.status(404).send({ status: 'error', mensaje: 'Producto no encontrado' });
        }
        
       } catch (error) {
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
       } 
})

export default router;