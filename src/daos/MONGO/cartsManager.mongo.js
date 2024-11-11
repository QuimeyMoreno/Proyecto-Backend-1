import cartModel from "../../models/carts.model.js";

class CartManager{
    constructor(){
        this.model = cartModel;
    }

    create = async () => {
        try {
            const newCart = new this.model({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log("Error al crear el carrito", error);
        }
    }

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

    createProductToCart = async (cartId, productId, quantity = 1) => {
        try {
            const cart = await this.getBy(cartId);
            const productExists = cart.products.find(p => p.product.toString() === productId)

            if (productExists) {
                productExists.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            cart.markModified("products");
            await cart.save(); 
            return cart;

        } catch (error) {
            console.log("Error al agregar un producto: ", error); 
        }
    }

    deleteProductFromCart = async (cartId, productId) => {
        try {
            const cart = await this.getBy(cartId);
            if (!cart) {
                return null;  
            }

            cart.products = cart.products.filter(p => p.product.toString() !== productId);
            await cart.save();
            return cart;
        } catch (error) {
            console.log("Error al eliminar producto del carrito: ", error);
            throw error;
        }
    }

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