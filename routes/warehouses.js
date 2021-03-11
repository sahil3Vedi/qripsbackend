const express = require('express');
const router  = express.Router();
const Warehouse = require('../models/Warehouse');
const Superuser = require('../models/Superuser');
const auth = require('../middleware/auth');

//FETCHES ALL THE WAREHOUSES FROM COLLECTION
router.get('/', auth, async (req,res) => {
    // authenticating Superuser
    Superuser.findById(req.user.id)
    .then(superuser=>{
        if(!superuser) res.status(401).json({ok: true, message: "Authorization Denied (Sneak)"})
    })
    // fetching Warehouses from DB
    try{
        const warehouses = await Warehouse.find();
        res.json(warehouses);
    } catch(err) {
        res.json({message: err});
    }
});

//ADDS A WAREHOUSE TO COLLECTION
router.post('/', auth, async(req,res) => {
    // authenticating Superuser
    Superuser.findById(req.user.id)
    .then(superuser=>{
        if(!superuser) res.status(401).json({ok: true, message: "Authorization Denied (Sneak)"})
    })
    // looking for conflicting names
    Warehouse.findOne({"warehouse_name":req.body.warehouse_name})
    .then(warehouse=>{
        if (warehouse){
            return res.status(400).json({message: 'Warehouse already exists'})
        } else {
            // saving Warehouse to DB
            const warehouse = new Warehouse({
                warehouse_name: req.body.warehouse_name,
                warehouse_address: req.body.warehouse_address,
                warehouse_city: req.body.warehouse_city,
                warehouse_pincode: req.body.warehouse_pincode,
                warehouse_products: [],
            });
            try{
                const savedWarehouse = warehouse.save();
                res.json({ok: true, message: savedWarehouse})
            } catch(err) {
                res.json({message: err});
            }
        }
    })
});


// DELETES A WAREHOUSE FROM THE COLLECTION
router.delete('/:id', auth, async(req,res) => {
    // authenticating Superuser
    Superuser.findById(req.user.id)
    .then(superuser=>{
        if(!superuser) res.status(401).json({ok: true, message: "Authorization Denied (Sneak)"})
    })
    // looking for conflicting names
    Warehouse.findById(req.params.id)
    .then(item => item.remove().then(()=>res.json({success: true, message: "Warehouse Deleted"})))
    .catch(err => res.status(400).json({success: false, message: "Unable to Delete Warehouse"}))
});

module.exports = router;
