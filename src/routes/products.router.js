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
    }
})

router.get('/:pid', async (req, res) =>{
    try {
        const id = Number(req.params.pid);
        const productsDb = await productsManagerFs.getProducts();
        const product = productsDb.find(product => product.id === id);

        if(!product){
            return res.status(404).send({status: 'error', mensaje: 'Producto no encontrado'});
        }
        res.send({status: 'success', data: product});
    } catch (error) {
        console.log(error)
    }
})


router.post('/', async (req, res) =>{
    try {
        const { body } = req;
        const response = await productsManagerFs.createProducts(body);
        res.send({status:'succes', data: response})        
    } catch (error) {
        console.log(error)
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const id = Number(req.params.pid);

        const { id: _, ...updateFields } = req.body;
        
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
        const id = Number(req.params.pid);
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
        console.log(error)
       } 
})

export default router;