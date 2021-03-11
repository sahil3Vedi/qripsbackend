const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/',(req,res) => {
    res.send('We are on users')
});

// Create a new user
router.post('/',(req,res) => {
    const {firstname,lastname,email,password} = req.body;
    // Simple Validation
    if (!firstname || !lastname || !email || !password){
        return res.status(400).json({message: 'Please Enter All Fields'})
    }
    // Check existing users
    User.findOne({email})
    .then(user => {
        if (user){
            return res.status(400).json({message: 'User already exists'})
        }
        else{
            const newUser = new User({
                firstname,
                lastname,
                email,
                password
            })

            // Create salt & hash
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user=> {
                        jwt.sign(
                            {id: user.id},
                            process.env.jwtSecret,
                            { expiresIn: 3600 },
                            (err,token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user:{
                                        id: user.id,
                                        firstname: user.firstname,
                                        lastname: user.lastname,
                                        email: user.email,
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

// Login a user
router.post('/login',(req,res) => {
    const {email,password} = req.body
    // Simple Validation
    if (!email || !password){
        return res.status(400).json({message: 'Please Enter All Fields'})
    }
    // Check existing users
    User.findOne({email})
    .then(user => {
        if (!user){
            return res.status(400).json({message: 'User does not exist'})
        }
        else{
            // validate password
            bcrypt.compare(password, user.password)
            .then(isMatch=>{
                if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'})
                jwt.sign(
                    {id: user.id},
                    process.env.jwtSecret,
                    { expiresIn: 3600 },
                    (err,token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user:{
                                id: user.id,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                email: user.email,
                            }
                        })
                    }
                )
            })
        }

    })
});


module.exports = router;
