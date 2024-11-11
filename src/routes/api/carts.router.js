import { Router } from "express";
import CartsController from "../../controllers/cart.controllers.js";


const router = Router();
const {
    createCart,
    getCart,
    createProductToCart,
    deleteProductFromCart,
    updateCart,
    updateProductQuantity,
    deleteAllProductsFromCart,
    finalizePurchase 
} = new CartsController()


router.post('/', createCart)

router.get('/:cid', getCart)

router.post('/:cid/product/:pid', createProductToCart)

router.delete('/:cid/product/:pid', deleteProductFromCart);

router.put('/:cid', updateCart);

router.put('/:cid/products/:pid', updateProductQuantity);

router.delete('/:cid', deleteAllProductsFromCart);

router.post('/:cid/purchase', finalizePurchase);



export default router;