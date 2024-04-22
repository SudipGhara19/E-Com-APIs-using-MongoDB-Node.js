import UserModel from "../user/user.model.js";
import ApplicationError from "../../error-handler/applicationError.js";

export default class ProductModel{
    constructor(id, name, desc, imageUrl, category, price, sizes){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.category = category;
        this.price = price;
        this.sizes = sizes;
    }

    // get all the products
    static getAll(){
        return products;
    }

    //get only one product
    static get(id){
        const product = products.find((i) => i.id == id);
        return product;
    }

    // to add a item
    static add(product){
        product.id = products.length + 1;
        products.push(product);
        return product;
    }

    // to filter product
    static filter(minPrice, maxPrice, category){
        const result = products.filter((product)=>{
          return(
          (!minPrice || 
            product.price >= minPrice) &&
          (!maxPrice || 
            product.price <= maxPrice) &&
          (!category || 
            product.category == category)
          );
        });
        return result;
      }


      static rateProduct(userID, productID, rating){
        // 1. validate user and product
        //validate user
        const user = UserModel.getAll().find((u) => u.id == userID);
        if(!user){
            throw new ApplicationError("User Not found.", 404);
        }

        //validate product
        const product = products.find((p) => p.id == productID);
        if(!product){
            throw new ApplicationError("Product not found.", 400);
        }


        2. //check if there is Rating array present. If not add a rating arry with userId & rating
        if(!product.ratings){
            product.rating = [];
            product.rating.push({
                userID: userID,
                rating: rating,
            });
        }else{
            // Check user rating is already available
            const existingRatingIndex = product.rating.findIndex((r) => r.userID == userID);

            if(existingRatingIndex >= 0){
                product.ratings[existingRatingIndex] = {
                    userID: userID,
                    rating: rating,
                };
            }else{
                product.rating.push({
                    userID: userID,
                    rating: rating,
                });
            }
        }
      }
}

var products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for product 1',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAgQVi2Iyctb8rJG2vkQ5ERNC78mqkReWqsw&s',
        'Electronics',
        200,

    ),

    new ProductModel(
        2,
        'Product 2',
        'Description for product 2',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVEUwFgQDmWswWCUVfD3tlNnobi76x4zmbUg&s',
        'T-shirt',
        99,
        ['S', 'M', 'L', 'XL']
    ),

    new ProductModel(
        3,
        'Product 3',
        'Description for product 3',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBaeayXJxpAeK4vemAre6txauSqTndpGBIHg&s',
        'Shirt',
        125,
        ['M', 'L', 'XL']
    )
]