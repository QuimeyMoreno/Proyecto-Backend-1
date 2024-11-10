import userModel from "../../models/user.model.js";


class UserDaoMongo{
    constructor(){
        this.model = userModel;
    }

    async get(){
        return await this.model.find({})           
    }

    async getBy(filter){
        return await this.model.findOne(filter)
    }

    async create(newUser){
        return await this.model.create(newUser)
    }

}

export default UserDaoMongo;