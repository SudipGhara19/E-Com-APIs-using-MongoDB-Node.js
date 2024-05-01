import CartModel from "./cartitems.model.js";
import CartItemsRepository from "./cartitems.repository.js";


export default class CartController {
    constructor(){
        this.cartItemsRespository = new CartItemsRepository();
    }

    async add(req, res) {
        try{
            const {productID, quantity} = req.body;
            const userID = req.userID;

            await this.cartItemsRespository.add(productID, userID, quantity);
            res.status(201).send("Cart is updated.");
        }catch{
            console.log(err);
            return  res.status(500).send("Something went wrong.");
        }
    }

    async get(req, res){
        try{
            const userID = req.userID;
            const items = await this.cartItemsRespository.get(userID);
            return res.status(200).send(items);
        }catch{
            console.log(err);
            return  res.status(500).send("Something went wrong.");
        }
    }

    async delete(req, res){
        try{
            const userID = req.userID;
            const cartItemID = req.params.id;

            const isDeleted = await this.cartItemsRespository.delete(userID, cartItemID);
            if(!isDeleted){
                return res.status(400).send("cartItem not found")
            }else{
                return res.status(200).send("Cart item is removed");
            }
        }catch{
            console.log(err);
            return  res.status(500).send("Something went wrong.");
        }
    }

}