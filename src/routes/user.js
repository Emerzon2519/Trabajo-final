const express = require("express");
const userSchema = require("../models/user")

const router = express.Router();

//  create user
router.post("/users", (req, res) => {
    const user = userSchema(req.body);
    user.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//  get all users
router.get("/users", (req, res) => {
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});


// get a user
router.get("/users/:id", (req, res) => {
    const {id} = req.params;
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

// update a user

router.put("/users/:id", (req, res) => {
    const {id} = req.params;
    const {name,email,usuario,contraseña,pokemones} =req.body;
    userSchema
    .updateOne({ _id: id}, {$set: {name, email,usuario,contraseña,pokemones}})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

//almacenar pokemons

router.put("/users/:id", (req, res) => {
    const {id} = req.params;
    const {pokemones} =req.body;
    //busqueda
        userSchema
        .findById(id)
        .then((data) => {
                userSchema
        .updateOne({ _id: id}, {$set: {pokemones:data.pokemones.push(pokemones)}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
        })
        .catch((error) => res.json({message: error}));
});


// delete a user

router.delete("/users/:id", (req, res) => {
    const {id} = req.params;
    userSchema
    .remove({ _id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});


module.exports = router;