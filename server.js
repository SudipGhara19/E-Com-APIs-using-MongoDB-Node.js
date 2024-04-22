import express from 'express';
import swagger from "swagger-ui-express";
import cors from 'cors';


import productRouter from './src/features/product/product.routes.js';
import bodyParser from 'body-parser';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cartitems/cartitems.routes.js';
// import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import apiDocs from './swagger.json' assert {type: "json"};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import ApplicationError from './src/error-handler/applicationError.js';

const server = express();


//  CORS Policy Configuration using cors libbrary
const corsOptions = {
    origin: 'http://localhost:3300',
};

server.use(cors(corsOptions));

server.use(loggerMiddleware);
 

//to post data in json
server.use(bodyParser.json());

// for all requests related to product, redirect to product routes.
// localhost:5500/api/products

//API creating documentaion link
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));

server.use('/api/cartItems', jwtAuth,  cartRouter);
server.use('/api/products', jwtAuth,  productRouter);
server.use('/api/users', userRouter);

//default request handeler
server.get('/', (req, res) => {
    res.send('Welcome to E-commerce APIs.')
})

// Handle 404 requests 
server.use((req, res) => {
    res.status(404).send("Page not found. Please visit localhost:5500/api-docs for more information.")
});


//Handle ERRORS  Apllication level and user level
server.use((err, req, res, next) => {
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }

    res.status(500).send("Something went wrong, please try again later.")
})


server.listen(5500, () => {
    console.log('Server is up and running on Port: 5500');
})