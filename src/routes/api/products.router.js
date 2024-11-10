import { Router } from "express";
import ProductController from "../../controllers/product.controllers.js";



const router = Router();

const {
    getProducts,
    getProduct,
    createProduct,
    updateProducts,
    deleteProducts
} = new ProductController()

router.get('/', getProducts)

router.get('/:pid', getProduct)

router.post('/', createProduct)

router.put('/:pid', updateProducts)

router.delete('/:pid', deleteProducts)

export default router;