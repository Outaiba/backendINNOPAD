const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Renamed to User

authRouter.post("/register", async (req, res) => {
    try {
        //get the user input
        const{name, email, password} = req.body;

        //validate the user input
        if(!name || !email || !password){
            return res.status(400).json({msg: "Please enter all fields"});
        }
        //check for existing user
        const oldUser = await User.findOne({email}); // Use User instead of user
        if(oldUser){
            return res.status(400).json({msg: "User already exists"});
        }
        //encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        //create a new user
        const newUser = await User.create({ // Renamed to newUser
            name,
            email,
            password: encryptedPassword
        });

        //create a token
        const token = jwt.sign({user_id: newUser._id, email}, process.env.JWT_SECRET, {
            expiresIn: "2h"
        }); 
        newUser.token = token; // Use newUser instead of user
        res.status(201).json(newUser); // Use newUser instead of user
    } catch (error) {
        console.log(error);
    }
});

// Similar changes should be made in the login route
authRouter.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        //validate the user input
        if(!email || !password){
            return res.status(400).json({msg: "Please enter all fields"});
        }

        const existingUser = await User.findOne({email}); // Renamed to existingUser

        //check if the user exists
        if(existingUser && (await bcrypt.compare(password, existingUser.password))){
            //create a token
            const token = jwt.sign(
                {user_id: existingUser._id, email}, 
                process.env.JWT_SECRET, 
                {expiresIn: "2h"}
            );
            existingUser.token = token; // Use existingUser instead of user
            res.status(200).json(existingUser); // Use existingUser instead of user
        } else {
            res.status(400).json({msg: "Invalid credentials"});
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = authRouter;