const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(bodyParser.json());
var corsOptions = {
    origin: [process.env.ADMINFRONTEND,process.env.SUPPLIERFRONTEND,process.env.FRONTEND],
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

//Import Routes

// Image Uploads Handled by Cloudinary
//const filesRoute = require('./routes/files');
//app.use('/files', filesRoute);

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

const superusersRoute = require('./routes/superusers');
app.use('/superusers', superusersRoute);

const suppliersRoute = require('./routes/suppliers');
app.use('/suppliers',suppliersRoute)

const warehousesRoute = require('./routes/warehouses');
app.use('/warehouses', warehousesRoute);

const productsRoute = require('./routes/products');
app.use('/products', productsRoute);

const ordersRoute = require('./routes/orders');
app.use('/orders', ordersRoute);

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err,succ)=>{console.log(err)}
)

// How do we start listening?
app.listen(process.env.PORT || 8000);
