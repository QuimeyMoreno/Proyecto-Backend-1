/*
ME LO GUARDO COMO APUNTE. 


import fs from 'fs'
const path = './dbjson/cartsDb.json'

class CartManagerFs {
    constructor(){
        this.path = path;
    }

    readCart = async () =>{
        try {
            const cartJson = await fs.promises.readFile(path, 'utf-8');
            const cartJs = JSON.parse(cartJson);
            return cartJs;
        } catch (error) {
            console.log(error)
            return [];
        }
    }

    createCart = async (newCart) =>{
        try {

            const cart = await this.readCart();
            let newCartId;

            if (cart.length === 0) {
                newCartId = 1;
            } else {
                newCartId = cart[cart.length - 1].id + 1;
            }
            
            const newCart = {
                id: newCartId,
                products: []
            };

            cart.push(newCart);

            await fs.promises.writeFile(path, JSON.stringify(cart, null, '\t'))

        } catch (error) {
            console.log(error)
        }
    }

    getCartById = async idCart =>{
        try {
            const carts = await this.readCart();

            const cart = carts.find((cart) => cart.id === idCart);

            if(!cart){
                console.error("Error, el id del carrito no es el correcto"); 
                return null
            }

            return cart;
        } catch (error) {
            console.log(error)
        }
    }

    
    createProductToCart = async (cartId, productId) => {
        try {
            const carts = await this.readCart();
            const cartIndex = carts.findIndex(cart => cart.id === cartId);
    
            if (cartIndex === -1) {
                console.error("Error: Carrito no encontrado");
                return null;
            }
    
            const products = carts[cartIndex].products;
            const productIndex = products.findIndex(p => p.product === productId);
    
            if (productIndex === -1) {
                products.push({ product: productId, quantity: 1 });
            } else {
                products[productIndex].quantity += 1;
            }
    
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return carts[cartIndex];
    
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    
}


export default CartManagerFs;

*/

