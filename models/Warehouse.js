const mongoose = require('mongoose');

// Create Schema
const WarehousesSchema = mongoose.Schema({
    warehouse_name: {
        type: String,
        required: true,
        unique: true
    },
    warehouse_address:{
        type: String,
        required: true
    },
    warehouse_city:{
        type: String,
        required: true
    },
    warehouse_pincode:{
        type: String,
        required: true,
    },
    warehouse_products: [{type: String}]
})

module.exports = mongoose.model('Warehouse',WarehousesSchema)
