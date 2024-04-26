import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";

class UserRepository{

    async signUp(newUser){
        try{
            // 1. Get the DB
            const db = getDB();
            // 2. get the DB collection
            const collection = db.collection("user");

            // 3. Insert the Document
            await collection.insertOne(newUser);
            return newUser;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong in database.");
        }
    }


    async signIn(email, password){
        try{
            // 1. Get the DB
            const db = getDB();
            // 2. get the DB collection
            const collection = db.collection("user");

            // 3. Find the Document
           return await collection.findOne({email, password});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong in database.");
        }
    }


    async findByEmail(email){
        try{
            // 1. Get the DB
            const db = getDB();
            // 2. get the DB collection
            const collection = db.collection("user");

            // 3. Find the Document
           return await collection.findOne({email});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong in database.");
        }
    }
}

export default UserRepository;