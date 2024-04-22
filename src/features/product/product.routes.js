import express from 'express';
import ProductController from './product.controller.js';
import upload from '../../middlewares/fileupload.middleware.js';

const productRouter = express.Router();
const productController = new ProductController();


// localhost:5500/api/products/filter?minPrice=20&maxPrice=50&category=Shirt
productRouter.get('/filter', productController.filterProducts);

productRouter.get('/', productController.getAllProducts);
productRouter.post('/', upload.single("imageUrl"), productController.addProduct);
productRouter.get('/:id', productController.getOneProduct);
productRouter.post('/rate', productController.rateProduct);



export default productRouter;

