import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import ApplicationError from "../../error-handler/applicationError.js";
import UserRepository from "./user.repository.js";

export default class UserController{
    
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(req, res){
        try{
        const {name, email, password, type} = req.body;
        const user = new UserModel(name, email, password, type);

            await this.userRepository.signUp(user);
        res.status(201).send(user);
        }catch(err){
            throw new Error(err);
        }
    }

    async signIn(req, res, next){
        try{
            const {email, password} = req.body;
            const user = await this.userRepository.signIn(email, password);

            if(!user){
                throw new ApplicationError("User Not Found.", 400);
            }else{
                // 1. Create Token
                const token = jwt.sign({userID: user.id, email: user.email}, "ZrfSDXbpd2Q5eyDtPj5VBUOCpHDHi0Re", {
                    expiresIn: '7d',
                });

                // 2. Send Token
                return res.status(200).send(token);
            }
        }catch(err){
            console.log(err);
            return  res.status(400).send("Something went wrong.");
        }
    }

}