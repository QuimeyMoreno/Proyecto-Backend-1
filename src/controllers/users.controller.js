import services from "../services/index.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

const { userService } = services;

class UserController {
    constructor(){
        this.service = userService;
    }

    registerUser = async (req, res) =>{
        const {first_name, last_name, email, password} = req.body;
        console.log(first_name, last_name, email, password);
        
        if(!first_name || !email || !password){
            return res.status(400).send({status:'error', message:"Todos los campos deben estar requeridos"})
        }
    
        const userFound = await this.service.getUser({email});
    
        if(userFound){
            return  res.status(401).send({status:'error', message:'Ya existe un usuario con ese email'})
        }
    
        const newUser = {
            first_name,
            last_name, 
            email,
            password: createHash(password) 
        }
    
        let result = await this.service.createUser(newUser);
    
        res.send({
            status: 'succes',
            data: result
        })
    }

    loginUser = async (req, res)=>{
        const { email, password } = req.body
    
        if(!email || !password) return res.status(400).send({stauts: 'success', message: 'deben venir todos los campos requeridos'})
    
        const userFound = await this.service.getUser({email})
        if(!userFound) return res.status(401).send({status: 'error', message: 'No se encuentra el usuario con ese email'})
    
        // validar password 
        if(!isValidPassword(password, userFound.password)) return res.send({status: 'error', message: 'las credenciales no coinciden'})
            
        const token = generateToken({
            id: userFound._id,
            role: userFound.role === 'admin'
        })
        res.cookie('token', token,{
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly:true
        }).send({
            status: 'success',
            data: userFound,
            token
        })
    }
}

export default UserController;