import CartManager from "../daos/MONGO/cartsManager.mongo.js";
import ProductManagerMongo from "../daos/MONGO/productsManager.mongo.js";
import TicketManager from "../daos/MONGO/ticketManager.mongo.js";
import UserDaoMongo from "../daos/MONGO/userManager.mongo.js";
import CartRepository from "../repositories/cart.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import TicketService from "../repositories/ticket.repository.js";
import UserRepository from "../repositories/user.repository.js";

const productService = new ProductRepository(new ProductManagerMongo())
const cartService = new CartRepository(new CartManager());
const userService = new UserRepository(new UserDaoMongo());
const ticketService = new TicketService(new TicketManager())

export default { productService, cartService, userService, ticketService };

