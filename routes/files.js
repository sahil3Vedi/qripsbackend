const express = require('express');
const router  = express.Router();
const Formidable = require('formidable');
const path = require('path');
const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));

//Uploads a File
router.post('/', async(req,res) => {
    var form =  Formidable.IncomingForm();
    form.parse(req,function(err, fields, files){
        const oldpath = files.file.path;
        const newpath = __dirname + "\\uploads\\" + files.file.name;
        fs.rename(oldpath, newpath, function(err){
            if (err) throw err;
            else{
                res.json({filesrc:{src:`/uploads/${files.file.name}`}})
            }
        });
    });
});

module.exports = router;
