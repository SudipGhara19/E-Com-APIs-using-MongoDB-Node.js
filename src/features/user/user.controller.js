import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';

export default class UserController{

    signUp(req, res){
        const {name, email, password, type} = req.body;
        const user = UserModel.signUp(name, email, password, type);

        res.status(201).send(user);
    }

    signIn(req, res){
        const {email, password} = req.body;
        const user = UserModel.signIn(email, password);

        if(!user){
            return res.status(400).send("Invalid user credential!");
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