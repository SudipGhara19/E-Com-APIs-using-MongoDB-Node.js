import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import ApplicationError from "../../error-handler/applicationError.js";

export default class UserController{

    async signUp(req, res){
        try{
        const {name, email, password, type} = req.body;
        const user = await UserModel.signUp(name, email, password, type);

        res.status(201).send(user);
        }catch(err){
            throw new Error(err);
        }
    }

    signIn(req, res){
        const {email, password} = req.body;
        const user = UserModel.signIn(email, password);

        if(!user){
            throw new ApplicationError("User Not Found.", 400);
        }else{
            // 1. Create Token
            const token = jwt.sign({userID: user.id, email: user.email}, "ZrfSDXbpd2Q5eyDtPj5VBUOCpHDHi0Re", {
                expiresIn: '1h',
            });

            // 2. Send Token
            return res.status(200).send(token);
        }
    }

}