const express = require('express');
const meetRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const meet = require('../model/meet'); 


// post pour ajouter une nouvelle réunion meet
  meetRouter.post("/addMeet", async (req, res) => {
    try {
        //get the user input
        const{name} = req.body;

        //validate the user input
        if(!name){
            return res.status(400).json({msg: "Please enter all fields"});
        }
        //check for existing meet
        const oldMeet = await meet.findOne({name}); 
        if(oldMeet){
            return res.status(400).json({msg: "Meet already exists"});
        }

        //create a new meet
        const newMeet = await meet.create({ 
            name
        });

        res.status(201).json(newMeet); 
    } catch (error) {
        console.log(error);
    }
});

        // get meet by id
    meetRouter.get("/:id", async (req, res) => {
            try {
                const meetId = req.params.id;
                const foundMeet = await meet.findById(meetId);
                if (!foundMeet) {
                    return res.status(404).json({ msg: "Meet not found" });
                }
                res.status(200).json(foundMeet);
            } catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Server Error" });
            }
        });

module.exports = meetRouter;
