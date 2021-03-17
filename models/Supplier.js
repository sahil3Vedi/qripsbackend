const mongoose = require('mongoose');

const SuppliersSchema = mongoose.Schema({
    //Supplier Details
    supplier_name: {
        type: String,
        required: true
    },
    supplier_password: {
        type: String,
        required: true
    },
    supplier_description: {
        type: String,
        required: true
    },
    supplier_address: {
        type: String,
        required: true,
    },
    supplier_city: {
        type: String,
        required: true
    },
    supplier_pincode: {
        type: String,
        required: true,
    },
    supplier_state: {
        type: String,
        required: true
    },
    supplier_country: {
        type: String,
        required: true,
    },
    //POC Details
    poc_name: {
        type: String,
        required: true,
    },
    poc_phone: {
        type: String,
        required: true,
    },
    poc_email:{
        type: String,
        required: true,
    },
    poc_id_url:{
        type: String,
        required: true,
    },
    poc_id_name:{
        type: String,
        required: true,
    },
    //Owner Details
    owner_name: {
        type: String,
        required: true,
    },
    owner_phone: {
        type: String,
        required: true,
    },
    owner_email: {
        type: String,
        required: true,
    },
    owner_id_url:{
        type: String,
        required: true,
    },
    owner_id_name:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Supplier',SuppliersSchema)
