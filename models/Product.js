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
    }
})

module.exports = mongoose.model('Product',ProductsSchema)
