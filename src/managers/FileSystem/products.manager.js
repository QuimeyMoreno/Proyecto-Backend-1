import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
const path = './dbjson/productsDb.json';

class ProductsManagerFs{
    constructor(){
        this.path = path;
    }

    readProduct = async () =>{
        if(fs.existsSync(path)){
            const productsJson = await fs.promises.readFile(path, 'utf-8');
            const productsJs = JSON.parse(productsJson);
            return productsJs
        }
        return [];
    }

    getProducts = async () =>{
        const products = await this.readProduct();
        return products;
    }

    createProducts = async newProduct =>{
        try {
            const products = await this.readProduct();

            newProduct.id = uuidv4(); 
                
            products.push(newProduct);

            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));

            return newProduct;

        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async (idProduct, updateFields) => {
        try {
            const products = await this.readProduct();
            const index = products.findIndex((p) => p.id === idProduct);
        
            if (index === -1) {
                console.error("Error, producto no encontrado");
                return false;
            }
        
            const productToUpdate = products[index];
            
            const updatedProduct = { ...productToUpdate, ...updateFields, id: productToUpdate.id };
            products[index] = updatedProduct;
        
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return updatedProduct;
        
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    

    deleteProduct = async idProduct =>{
        try {
            const products = await this.readProduct();
            const index = products.findIndex((p) => p.id === idProduct);

        if (index === -1) {
            console.error("Error: No se encontró el producto");
            return false;

        }
        products.splice(index, 1);

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default ProductsManagerFs;