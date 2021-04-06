const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    // FIELDS SUBMITTED BY THE SUPPLIER
    supplier: {
        type: String,
        required: true
    },
    supplier_name: {
        type: String,
        required: true
    },
    supplier_company: {
        type: String,
        required: true
    },
    supplier_description: {
        type: String,
        required: true
    },
    supplier_images: [{
        type: String,
    }],
    supplier_unit_price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    mfg_date: {
        type: String,
        required: true
    },
    expiry_date: {
        type: String,
        required: true
    },
    product_id_type: {
        type: String,
        required: true
    },
    product_id:{
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true
    },
    shop_name: {
        type: String
    },
    shop_company: {
        type: String
    },
    shop_description: {
        type: String
    },
    tags: [{
        type: String,
    }],
    market_price: {
        type: String
    },
    shop_price: {
        type: String
    },
    shop_images: [{
        type: String,
    }],
    color: {
        type: String
    },
})

module.exports = mongoose.model('Product',ProductsSchema)
