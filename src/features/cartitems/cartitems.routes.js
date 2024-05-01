import express from 'express';
import CartController from './cartitems.controller.js';

const cartRouter = express.Router();
const cartController = new CartController();

cartRouter.post('/', (req, res) => {
    cartController.add(req, res);
});

cartRouter.get('/', (req, res) => {
    cartController.get(req, res)
});

cartRouter.delete('/:id', (req, res) => {
    cartController.delete(req, res)
});


export default cartRouter;