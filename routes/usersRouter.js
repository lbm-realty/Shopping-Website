const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout } = require('../controllers/authController');
const userModel = require('../models/user-model');

router.get("/", function(req, res) {
    res.send("Hey it's working");
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/all', async function(req, res){
    let users = await userModel.find();
    res.send(users);
});

router.post('/logout', logout)

module.exports = router;