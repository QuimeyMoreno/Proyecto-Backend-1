
import { Router } from "express";
import passportCall from "../../middleware/passportCall.js";
import UserController from "../../controllers/users.controller.js";

const router = Router();

const {
    registerUser,
    loginUser
} = new UserController()

router.post('/register', registerUser)


router.post('/login', loginUser)

router.get('/current', passportCall('jwt'), (req, res)=>{
    res.send({dataUser: req.user, message:'datos sensibles'})
}
)


export default router;