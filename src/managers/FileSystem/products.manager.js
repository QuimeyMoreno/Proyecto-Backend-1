import fs from 'fs';
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

            if(products.length === 0){
                newProduct.id = 1;
            }else{
                newProduct.id = products[products.length-1].id + 1;
            }

            if(products.length === 0){
                newProduct.code = "1";
            }else{
                const lastCode = products[products.length - 1].code;
                const newCode = parseInt(lastCode, 10) + 1;
                newProduct.code = newCode.toString();
            }
            
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
            
            const updatedProduct = { ...productToUpdate, ...updateFields };
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