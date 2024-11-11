import services from "../services/index.js";
const { cartService } = services;

class CartsController {
    constructor(){
        this.service = cartService
    }

    createCart = async (req, res) => {
        try {
            const newCart = await this.service.createCart();
            res.json(newCart); 
        } catch (error) {
            res.status(500).send("Error del servidor");
        }
    }

    getCart = async (req, res) =>{
        let cartId = req.params.cid;
        try {
            const cart = await this.service.getCartById(cartId);
            res.json(cart);
        } catch (error) {
            res.status(500).send("Error al obtener los productos del carrito");
        }
    }

    createProductToCart = async (req, res) => {
        const cartId = req.params.cid; 
        const productId = req.params.pid; 
        const quantity = req.body.quantity || 1; 
        
        try {
            const updatedCart = await this.service.createProductToCart(cartId, productId, quantity);
            
            // Devolver el carrito actualizado junto con su ID
            res.json({
                status: 'success',
                message: 'Producto agregado al carrito',
                cartId: updatedCart._id, // Enviar el ID del carrito
                cart: updatedCart // Enviar el carrito completo si lo necesitas
            });
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            res.status(500).send("Error al agregar un producto");
        }
    };

    deleteProductFromCart = async (req, res) => {
        let cartId = req.params.cid;
        let productId = req.params.pid;
    
        try {
            const updatedCart = await this.service.deleteProductFromCart(cartId, productId);
    
            if (!updatedCart) {
                return res.status(404).send({ status: 'error', mensaje: 'Carrito no encontrado' });
            }
    
            res.json({ status: 'success', mensaje: 'Producto eliminado', cart: updatedCart });
        } catch (error) {
            res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
        }
    }

    updateCart = async (req, res) => {
        let cartId = req.params.cid;
        let newProducts = req.body.products; 
    
        if (!newProducts || !Array.isArray(newProducts)) {
            return res.status(400).send({ status: 'error', mensaje: 'Debe proporcionar un arreglo de productos' });
        }
    
        try {
            const updatedCart = await this.service.updateCart(cartId, newProducts);
    
            if (!updatedCart) {
                return res.status(404).send({ status: 'error', mensaje: 'Carrito no encontrado' });
            }
    
            res.json({ status: 'success', mensaje: 'Carrito actualizado', cart: updatedCart });
        } catch (error) {
            res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
        }
    }

    updateProductQuantity = async (req, res) => {
        let cartId = req.params.cid;
        let productId = req.params.pid;
        let newQuantity = req.body.quantity;
    
        if (!newQuantity || newQuantity <= 0) {
            return res.status(400).send({ status: 'error', mensaje: 'Cantidad inválida' });
        }
    
        try {
            const updatedCart = await this.service.updateProductQuantity(cartId, productId, newQuantity);
    
            if (!updatedCart) {
                return res.status(404).send({ status: 'error', mensaje: 'Carrito o producto no encontrado' });
            }
    
            res.json({ status: 'success', mensaje: 'Cantidad actualizada', cart: updatedCart });
        } catch (error) {
            res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
        }
    }
    
    deleteAllProductsFromCart =  async (req, res) => {
        let cartId = req.params.cid;
    
        try {
            const updatedCart = await this.service.deleteAllProductsFromCart(cartId);
    
            if (!updatedCart) {
                return res.status(404).send({ status: 'error', mensaje: 'Carrito no encontrado' });
            }
    
            res.json({ status: 'success', mensaje: 'Carrito vaciado', cart: updatedCart });
        } catch (error) {
            res.status(500).send({ status: 'error', mensaje: 'Error interno del servidor' });
        }
    }
}

export default CartsController;