
import { Router } from "express";
import passportCall from "../../middleware/passportCall.js";
import UserController from "../../controllers/users.controller.js";

const router = Router();

const {
    registerUser,
    loginUser,
    currentDto
} = new UserController()

router.post('/register', registerUser)


router.post('/login', loginUser)

router.get('/current', passportCall('jwt'), currentDto)


export default router;