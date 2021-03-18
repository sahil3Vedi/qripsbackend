const express = require('express');
const router  = express.Router();
const Supplier = require('../models/Supplier');
const Superuser = require('../models/Superuser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

//FETCHES ALL THE SUPPLIERS FROM COLLECTION
router.get('/', auth, async (req,res) => {
    // authenticating Superuser
    Superuser.findById(req.user.id)
    .then(superuser=>{
        if(!superuser) res.status(401).json({ok: true, message: "Authorization Denied (Sneak)"})
    })
    // fetching Suppliers from DB
    try{
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch(err) {
        res.json({message: err});
    }
});

//ADDS A SUPPLIER TO COLLECTION
router.post('/', auth, async(req,res) => {
    // authenticating Superuser
    await Superuser.findById(req.user.id)
    .then(superuser=>{
        if(!superuser) res.status(401).json({ok: true, message: "Authorization Denied (Sneak)"})
    })
    // looking for conflicting names
    Supplier.findOne({"supplier_name":req.body.supplier_name})
    .then(supplier=>{
        if (supplier){
            return res.status(400).json({message: 'Supplier already exists'})
        } else {
            // saving Warehouse to DB
            const supplier = new Supplier({
                supplier_name: req.body.supplier_name,
                supplier_password: req.body.supplier_password,
                supplier_description: req.body.supplier_description,
                supplier_address: req.body.supplier_address,
                supplier_city: req.body.supplier_city,
                supplier_pincode: req.body.supplier_pincode,
                supplier_state: req.body.supplier_state,
                supplier_country: req.body.supplier_country,
                poc_name: req.body.poc_name,
                poc_phone: req.body.poc_phone,
                poc_email: req.body.poc_email,
                poc_id_url: req.body.poc_id_url,
                poc_id_name: req.body.poc_id_name,
                owner_name: req.body.owner_name,
                owner_phone: req.body.owner_phone,
                owner_email: req.body.owner_email,
                owner_id_url: req.body.owner_id_url,
                owner_id_name: req.body.owner_id_name,
            });
            // Create salt & hash
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(supplier.supplier_password, salt, async (err, hash) => {
                    if (err) throw err;
                    supplier.supplier_password = hash;
                    await supplier.save()
                    .then(supplier=> {
                        return res.status(200).json({
                            ok: true,
                            supplier:{
                                id: supplier.id,
                                supplier_name: supplier.supplier_name,
                            }
                        })
                    })
                    .catch(err=>{
                        return res.status(400).json({message:err});
                    })
                })
            })
        }
    })
});

module.exports = router;
