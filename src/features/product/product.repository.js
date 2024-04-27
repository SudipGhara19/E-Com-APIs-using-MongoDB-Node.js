import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";


class ProductRepository{

    constructor(){
        this.collection = "products";
    }

    // add new product to DB
    async add(newProduct){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            await collection.insertOne(newProduct);
            return newProduct;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database.", 500);
        }
    }

    // get all products from DB
    async getAll(){
        try{

            const db = getDB();
            const collection = db.collection(this.collection);

            const products = await collection.find().toArray();
            return products;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database.", 500);
        }
    }

    // get Products for specific product id from DB
    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            const product = await collection.findOne({_id: new ObjectId(id)});
            return product;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database.", 500);
        }
    }
}


export default ProductRepository;