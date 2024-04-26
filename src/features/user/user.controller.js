import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import ApplicationError from "../../error-handler/applicationError.js";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController{
    
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(req, res){
        try{
        const {name, email, password, type} = req.body;

        const hashPassword = await bcrypt.hash(password, 12);
        const user = new UserModel(name, email, hashPassword, type);

            await this.userRepository.signUp(user);
        res.status(201).send(user);
        }catch(err){
            throw new Error(err);
        }
    }

    async signIn(req, res, next){
        try{
            const {email, password} = req.body;

            const user = await this.userRepository.findByEmail(email);
            if(!user){
                // 1. Find the user by Email.
                return res.status(400).send("Incorrect credentials.")
            }else{
                // 2. comapare the input Password with Hash-Pasword
                const result = await bcrypt.compare(password, user.password);

                // if user sign in create token
                if(result){
                    const token = jwt.sign({userID: user.id, email: user.email}, "ZrfSDXbpd2Q5eyDtPj5VBUOCpHDHi0Re", {
                        expiresIn: '7d',
                    });
                    // if password is correct Signin successfully
                    return res.status(200).send(token);
                }else{
                    return res.status(400).send("Incorrect Credentials.")
                }
            }
        }catch(err){
            console.log(err);
            return  res.status(500).send("Something went wrong.");
        }
    }

}