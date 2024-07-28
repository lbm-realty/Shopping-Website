const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function(req, res) {
    try{
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({email: email});
        if(user) return res.status(401).send("Account already exists, please login");

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function(err, hash){
               if(err)  return res.send(err);
               else{
                let user = await userModel.create({
                    email,
                    password: hash,
                    fullname, 
                });
                let token = generateToken(user)
                res.cookie("token", token);
                res.send("User created successfully")
            }
            })
        })
    }
    catch (err) {
        res.send(err.message);
    }
}

module.exports.loginUser = async function (req, res) {
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user){
        res.flash("error", "Email or password incorrect");
    }

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        }
        else{
            return res.send("Email or password incorrect")
        }
    })
};

module.exports.logout = function (req, res){
    res.cookie("token", "");
    res.redirect("/");
}