import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController{

    constructor(){
        this.productRepositary = new ProductRepository();
    }

    // get all product
    async getAllProducts(req,res){
        try{
        const products = await this.productRepositary.getAll();
        res.status(200).send(products);
        }catch(err){
            console.log(err);
            res.status(200).send("Something went wrong while gettingn all product.");
        }
    }

    // adding product
    async addProduct(req, res){
        try{
            const {name, price, sizes, desc, category} = req.body;
            const newProduct = new ProductModel(
                name,
                desc,
                req.file.filename,
                category,
                parseFloat(price),
                sizes.split(','),
            )
            ;
            const createdRecord = await this.productRepositary.add(newProduct);
            res.status(201).send(createdRecord);
        }catch(err){
            console.log(err);
            res.status(200).send("Something went wrong while adding new product.");
        }
    }

    rateProduct(req,res){
        const userID = req.query.userID;
        const productID = req.query.productID;
        const rating = req.queryfd.rating;

        try{
            ProductModel.rateProduct(userID, productID, rating);
        }catch(err){
            return res.status(400).send(err.message);
        }
        
        return res.status(200).send("Rating send succefully!");
        
    }

    // getting one product
    async getOneProduct(req,res){
        try{
            const id = req.params.id;
            const product = await this.productRepositary.get(id);
            if(!product){
                return res.status(404).send('Product not found.')
            }else{
                return res.status(200).send(product);
            }
        }catch(err){
            console.log(err);
            res.status(200).send("Something went wrong while adding new product.");
        }
    }

    filterProducts(req, res){
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = ProductModel.filter(
            minPrice,
            maxPrice,
            category
        );
        res.status(200).send(result);
    }

}