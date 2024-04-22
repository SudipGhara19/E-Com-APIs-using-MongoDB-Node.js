
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/ecomdb";

const connectToMongoDB = () => {
    MongoClient.connect(url)
    .then((client) => {
        console.log(":::::Connected to the MongoDB:::::");
    })
    .catch((err)=>console.log(err));
}

export default connectToMongoDB;