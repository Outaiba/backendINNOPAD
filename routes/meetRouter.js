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

    // je veux modifier une réunion en ajoutant plus de post-it  this.$axios.post(`api/meet/${this.$route.query.id}/postIt`, newPostIt)
            meetRouter.post("/:id/postIt", async (req, res) => {
                try {
                    const meetId = req.params.id;
                    const newPostIt = req.body;
                    const foundMeet = await meet.findById(meetId);
                    if (!foundMeet) {
                        return res.status(404).json({ msg: "Meet not found" });
                    }
                    foundMeet.postIts.push(newPostIt);
                    await foundMeet.save();
                    res.status(201).json(foundMeet);
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ msg: "Server Error" });
                }
            });

        // Modifier la position d'un post-it
         meetRouter.put("/:id/postIt/:postItId", async (req, res) => {
                try {
                    const meetId = req.params.id;
                    const postItId = req.params.postItId;
                    const newPosition = req.body;
                    const foundMeet = await meet.findById(meetId);
                    if (!foundMeet) {
                        return res.status(404).json({ msg: "Meet not found" });
                    }
                    const postIt = foundMeet.postIts.id(postItId);
                    if (!postIt) {
                        return res.status(404).json({ msg: "Post-it not found" });
                    }
                    postIt.position = newPosition;
                    await foundMeet.save();
                    res.status(200).json(foundMeet);
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ msg: "Server Error" });
                }
            });


            // ce endpoint permet de récupérer toutes les réunions
            meetRouter.get("/", async (req, res) => {
                try {
                    const meets = await meet.find();
                    res.status(200).json(meets);
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ msg: "Server Error" });
                }
            });

module.exports = meetRouter;
