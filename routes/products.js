const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');

//GETS BACK ALL THE PRODUCTS
router.get('/', async (req,res) => {
    try{
        const products = await Product.find();
        res.json(products);
    } catch(err) {
        res.json({message: err});
    }
});

//SUBMITS A PRODUCT
router.post('/', async(req,res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        quantity: req.body.quantity,
        warehouse_name: req.body.warehouse_name
    });
    try{
        const savedProduct = await product.save();
        res.json({ok: true, msg: product})
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;
