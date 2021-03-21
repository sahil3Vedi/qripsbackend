const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const Superuser = require('../models/Superuser')
const auth = require('../middleware/auth');

//GETS ALL PRODUCTS FROM ALL SUPPLIERS (FOR ADMIN)
router.get('/all',auth, async (req,res) => {
    // Authenticating Supplier
    Superuser.findById(req.user.id)
    .then(async(superuser)=>{
        if(!superuser) res.status(401).json({ok: false, message: "Authorization Denied (Sneak)"})
        try{
            const products = await Product.find();
            res.json(products);
        } catch(err) {
            res.json({message: err});
        }
    })
});

//GETS SUPPLIERS PRODUCTS FROM A COLLECTION
router.get('/',auth, async (req,res) => {
    // Authenticating Supplier
    Supplier.findById(req.user.id)
    .then(async(supplier)=>{
        if(!supplier) res.status(401).json({ok: false, message: "Authorization Denied (Sneak)"})
        try{
            const products = await Product.find({"supplier":supplier.supplier_name});
            res.json(products);
        } catch(err) {
            res.json({message: err});
        }
    })
});

//SUBMITS A PRODUCT TO THE COLLECTION
router.post('/', auth, async (req, res) => {
    // Authenticating Supplier
    Supplier.findById(req.user.id)
        .then(supplier => {
            if (!supplier) res.status(401).json({ ok: false, message: "Authorization Denied (Sneak)" })
            // looking for conflicting names
            Product.findOne({ "supplier_name": req.body.supplier_name })
                .then(async (product) => {
                    if (product) return res.status(400).json({ message: 'Product already exists' })
                    // saving product to DB
                    const new_product = new Product({
                        supplier: supplier.supplier_name,
                        supplier_name: req.body.supplier_name,
                        supplier_company: req.body.supplier_company,
                        supplier_description: req.body.supplier_description,
                        supplier_images: req.body.supplier_images,
                        supplier_unit_price: req.body.supplier_unit_price,
                        qty: req.body.qty,
                        mfg_date: req.body.mfg_date,
                        expiry_date: req.body.expiry_date,
                        product_id_type: req.body.product_id_type,
                        product_id: req.body.product_id,
                        approved: false
                    });
                    try {
                        const savedProduct = await new_product.save();
                        res.json({ ok: true, message: savedProduct })
                    } catch (err) {
                        res.json({ message: err });
                    }
                })
        })
});

module.exports = router;
