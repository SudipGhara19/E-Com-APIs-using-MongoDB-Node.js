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


    // filter products
    async filter(minPrice, maxPrice, category){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            const filterExpression = {};

            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)};
            }

            if(maxPrice){
                filterExpression.price = {...filterExpression.price,  $lte: parseFloat(maxPrice)};
            }

            if(category){
                filterExpression.category = category;
            }

            const filterProducts = await collection.find(filterExpression).toArray();
            return filterProducts;

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database.", 500);
        }
    }



    // Rate products 1st Approach

    async rate(userID, productID, rating){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            // Pulling previous Array added by the user
            await collection.updateOne({
                _id: new ObjectId(productID)
            },{
                $pull: {
                    ratings:{userID: new ObjectId(userID)}
                }
            })
            
            // pushing new Array
            await collection.updateOne(
                {_id: new ObjectId(productID)},
                {$push: {ratings:{userID, rating}}}
            )
            
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database.", 500);
        }
    }

    // Rate products 2nd Approach
    // async rate(userID, productID, rating){
    //     try{
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         // 1. find the product
    //         const product = await collection.findOne({_id: new ObjectId(productID)});
    //         // 2. if product available find the rating
    //         const userRating = product?.ratings?.find((r) => r.userID == userID);
    //         if(userRating){
    //             // 3. Update the rating
    //             await collection.updateOne({
    //                 _id: new ObjectId(productID), "ratings.userID": new ObjectId(userID)
    //             },{
    //                 $set:{
    //                     "ratings.$.rating": rating
    //                 }
    //             })

    //         }else{
    //             await collection.updateOne(
    //                 {_id: new ObjectId(productID)},
    //                 {$push: {ratings:{userID, rating}}}
    //             )
    //         }
            
    //     }catch(err){
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong with the database.", 500);
    //     }
    // }


    // finding category and there average prices
    async averageProductPricePerCategory(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            return await collection.aggregate([
                {
                    $group:{
                        _id:"$category",
                        averagePrice:{$avg: "$price"}
                    }
                }
            ]).toArray();

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database.", 500);
        }
    }
}


export default ProductRepository;