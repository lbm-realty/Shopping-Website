const express = require('express');
const router = express.Router();
const isloggedin = require('../middlewares/isLoggedIn');
const ownerModel = require('../models/owner-model');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', function (req, res) {
    let error = req.flash("error");
    res.render('index', { error, loggedin: false });
});

router.get('/shop', isloggedin, async function(req, res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
})

router.get('/cart', isloggedin, async function(req, res){
    let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart")
    console.log(user.cart);
    res.render("cart", { user });
})

router.get('/addtocart/:productid', isloggedin, async function(req, res){
    let user = await userModel.findOne({email: req.user.email})
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect('/shop');
})

router.get('/logout', isloggedin, function(req, res){
    res.render("shop")
})

// router.get('/hello', isloggedin, async function(req, res){
//     try {
//         let owner = await ownerModel.find();
//         res.send(owner)
//     }
//     catch (err) {
//         res.status(500).send("Server Error");
//     }
// });

module.exports = router;