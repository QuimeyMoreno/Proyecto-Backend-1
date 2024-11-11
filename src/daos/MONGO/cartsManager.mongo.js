import cartModel from "../../models/carts.model.js";

class CartManager{
    constructor(){
        this.model = cartModel;
    }

    create = async (userId) => {
        try {
            const newCart = new this.model({ userId, products: [] }); // Asocia el carrito al usuario
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log("Error al crear el carrito", error);
        }
    };
    

    getBy = async (cartId) => {
        try {
            const cart = await this.model.findById(cartId).populate('products.product');
            if (!cart) {
                console.log("El carrito no existe!");
                return null;
            }
    
            return cart;
        } catch (error) {
            console.log("Error al obtener el carrito por id", error);
        }
    }

    getCartByUserId = async (userId) => {
        try {
            const cart = await this.model.findOne({ userId }).populate('products.product');
            return cart;
        } catch (error) {
            console.log("Error al obtener el carrito por usuario", error);
        }
    };

    createCartForUser = async (userId) => {
        return await this.create(userId);
    };

    createProductToCart = async (cartId, productId, quantity) => {
        try {
            const cart = await this.getBy(cartId); // Obtén el carrito actualizado
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
    
            // Verificar si el producto ya existe en el carrito
            const existingProduct = cart.products.find(p => p.product.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity += quantity; // Incrementar cantidad si ya existe
            } else {
                cart.products.push({ product: productId, quantity }); // Agregar nuevo producto
            }
    
            await cart.save(); // Guardar carrito actualizado en la base de datos
            return cart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    };
    


    deleteProductFromCart = async (cartId, productId) => {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
    
            cart.products = cart.products.filter(p => p.product.toString() !== productId); // Filtrar producto
            await cart.save(); // Guardar carrito actualizado
    
            return cart; // Retornar el carrito actualizado
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
            throw error;
        }
    };
    

    update = async (cartId, productsArray) => {
        try {
            const cart = await this.getBy(cartId);
            if (!cart) {
                return null;  
            }
            
            cart.products = productsArray;
    
            await cart.save();
            return cart;
        } catch (error) {
            console.log("Error al actualizar el carrito: ", error);
            throw error;
        }
    }

    updateProductQuantity = async (cartId, productId, newQuantity) => {
        try {
            const cart = await this.getBy(cartId);
            if (!cart) {
                return null;  
            }
            const productInCart = cart.products.find(p => p.product.toString() === productId);
    
            if (!productInCart) {
                return null;  
            }
            productInCart.quantity = newQuantity;
    
            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.log("Error al actualizar la cantidad del producto: ", error);
            throw error;
        }
    }

    deleteAllProductsFromCart = async (cartId) => {
        try {
            const cart = await this.getBy(cartId);
            if (!cart) {
                return null;  
            }
    
            cart.products = []; 
    
            await cart.save();
            return cart;
        } catch (error) {
            console.log("Error al eliminar todos los productos del carrito: ", error);
            throw error;
        }
    }
    
}

export default CartManager;