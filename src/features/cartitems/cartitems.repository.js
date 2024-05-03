import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";

export default class CartItemsRepository{
    constructor(){
        this.collection = "cartItems";
    }

    // add cart item to Database
    async add(productID, userID, quantity){
        try{
        const db = getDB();
        const collection = db.collection(this.collection);
        const id = await this.getNextCounter(db);
        console.log(id);
        await collection.updateOne({productID: new ObjectId(productID), userID: new ObjectId(userID)},
        {
            $setOnInsert: {_id:id},
            $inc: {quantity: quantity}
        },
        {upsert: true})

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something wrong with the database.", 500);
        }
    }


    // get CartItems to specific User
    async get(userID){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            const cartItems = await collection.find({userID: new ObjectId(userID)}).toArray();
            return cartItems;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something wrong with the database.", 500);
        }
    }

    // delete CartItem
    async delete(userID, cartItemID){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            const result = collection.deleteOne({_id: new ObjectId(cartItemID), userID: new ObjectId(userID)});
            return result.deletedCount>0;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something wrong with the database.", 500);
        }
    }


    async getNextCounter(db){

        const resultDocument = await db.collection("counters").findOneAndUpdate(
            {_id:'cartItemId'},
            {$inc:{value: 1}},
            {returnDocument:'after'}
        )  
        console.log(resultDocument);
        return resultDocument.value;
    }
}