import { Router } from "express";
import CartManager from "../../daos/MONGO/cartsManager.mongo.js";


const router = Router();
const cartManager = new CartManager(); 

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart); 
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})


router.get('/:cid', async (req, res) =>{
    let cartId = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cartId);
        res.json(cart);
    } catch (error) {
        res.status(500).send("Error al obtener los productos del carrito");
    }
})

router.post('/:cid/product/:pid', async (req, res) =>{
    let cartId = req.params.cid; 
    let productId = req.params.pid; 
    let quantity = req.body.quantity || 1; 

    try {
        const update = await cartManager.createProductToCart(cartId, productId, quantity);
        res.json(update);
    } catch (error) {
        res.status(500).send("Error al agregar un producto");
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;

    try {
        const updatedCart = await cartManager.deleteProductFromCart(cartId, productId);

        if (!updatedCart) {
            return res.status(404).send({ status: 'error', mensaje: 'Carrito no encontrado' });
        }

        res.json({ status: 'success', mensaje: 'Producto eliminado', cart: updatedCart });
    } catch (error) {
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
});

router.put('/:cid', async (req, res) => {
    let cartId = req.params.cid;
    let newProducts = req.body.products; 

    if (!newProducts || !Array.isArray(newProducts)) {
        return res.status(400).send({ status: 'error', mensaje: 'Debe proporcionar un arreglo de productos' });
    }

    try {
        const updatedCart = await cartManager.updateCart(cartId, newProducts);

        if (!updatedCart) {
            return res.status(404).send({ status: 'error', mensaje: 'Carrito no encontrado' });
        }

        res.json({ status: 'success', mensaje: 'Carrito actualizado', cart: updatedCart });
    } catch (error) {
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let newQuantity = req.body.quantity;

    if (!newQuantity || newQuantity <= 0) {
        return res.status(400).send({ status: 'error', mensaje: 'Cantidad inválida' });
    }

    try {
        const updatedCart = await cartManager.updateProductQuantity(cartId, productId, newQuantity);

        if (!updatedCart) {
            return res.status(404).send({ status: 'error', mensaje: 'Carrito o producto no encontrado' });
        }

        res.json({ status: 'success', mensaje: 'Cantidad actualizada', cart: updatedCart });
    } catch (error) {
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
});

router.delete('/:cid', async (req, res) => {
    let cartId = req.params.cid;

    try {
        const updatedCart = await cartManager.deleteAllProductsFromCart(cartId);

        if (!updatedCart) {
            return res.status(404).send({ status: 'error', mensaje: 'Carrito no encontrado' });
        }

        res.json({ status: 'success', mensaje: 'Carrito vaciado', cart: updatedCart });
    } catch (error) {
        res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
    }
});


export default router;