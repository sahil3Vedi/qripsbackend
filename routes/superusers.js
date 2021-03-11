const express = require('express');
const router  = express.Router();
const Superuser = require('../models/Superuser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/',(req,res) => {
    res.send('We are on superusers')
});

// Create a new superuser
router.post('/',(req,res) => {
    const {username,password} = req.body;
    // Simple Validation
    if (!username || !password){
        return res.status(400).json({message: 'Please Enter All Fields'})
    }
    // Check existing users
    Superuser.findOne({username})
    .then(superuser => {
        if (superuser){
            return res.status(400).json({message: 'Superuser already exists'})
        }
        else{
            const newSuperuser = new Superuser({
                username,
                password
            })
            // Create salt & hash
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newSuperuser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newSuperuser.password = hash;
                    newSuperuser.save()
                    .then(superuser=> {
                        jwt.sign(
                            {id: superuser.id},
                            process.env.jwtSecret,
                            { expiresIn: 3600 },
                            (err,token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    superuser:{
                                        id: superuser.id,
                                        username: superuser.username,
                                    }
                                })
                            }
                        )
                    })
                })
            })
        }

    })
});

// Login a superuser
router.post('/login',(req,res) => {
    const {username,password} = req.body
    // Simple Validation
    if (!username || !password){
        return res.status(400).json({message: 'Please Enter All Fields'})
    }
    // Check existing users
    Superuser.findOne({username})
    .then(superuser => {
        if (!superuser){
            return res.status(400).json({message: 'Superuser does not exist'})
        }
        else{
            // validate password
            bcrypt.compare(password, superuser.password)
            .then(isMatch=>{
                if(!isMatch) return res.status(400).json({message: 'Invalid Credentials'})
                jwt.sign(
                    {id: superuser.id},
                    process.env.jwtSecret,
                    { expiresIn: 3600 },
                    (err,token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            superuser:{
                                id: superuser.id,
                                username: superuser.username,
                            }
                        })
                    }
                )
            })
        }

    })
});

module.exports = router;
