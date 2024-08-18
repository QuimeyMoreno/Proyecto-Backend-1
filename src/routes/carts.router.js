import { Router } from 'express'
import CartManagerFs from '../managers/FileSystem/carts.manager.js';



const router = Router();
const cartManagerFs = new CartManagerFs();


router.get('/:cid', async (req, res) =>{
    try {
        const id = Number(req.params.cid)
        const cart = await cartManagerFs.getCartById(id);
        

        if(!cart){
            return res.status(404).send({status: 'error', mensaje: 'Carrito no encontrado'});
        }
        res.send({status: 'success', data: cart});
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) =>{
    try {
        const { body } = req;
        const response = await cartManagerFs.createCart(body);
        res.send({status:'succes', mensaje: 'Carrito agregado correctamente', data: response})
    } catch (error) {
        console.log(error)
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = Number(req.params.cid);
        const productId = req.params.pid;

        const response = await cartManagerFs.createProductToCart(cartId, productId);

        if (response) {
            res.send({ status: 'success', data: response });
        } else {
            res.status(404).send({ status: 'error', mensaje: 'Carrito no encontrado o producto no pudo ser agregado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
});


export default router;