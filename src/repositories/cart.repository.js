class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }
    createCart = async () => {
        return await this.dao.create();
    };

    getCart = async (cartId) => {
        return await this.dao.getBy(cartId);
    };

    createProductToCart = async (cartId, productId, quantity) => {
        return await this.dao.createProductToCart(cartId, productId, quantity);
    };

    deleteProductFromCart = async (cartId, productId) => {
        return await this.dao.deleteProductFromCart(cartId, productId);
    };

    updateCart = async (cartId, productsArray) => {
        return await this.dao.update(cartId, productsArray);
    };

    updateProductQuantity = async (cartId, productId, newQuantity) => {
        return await this.dao.updateProductQuantity(cartId, productId, newQuantity);
    };

    deleteAllProductsFromCart = async (cartId) => {
        return await this.dao.deleteAllProductsFromCart(cartId);
    };
}

export default CartRepository;
