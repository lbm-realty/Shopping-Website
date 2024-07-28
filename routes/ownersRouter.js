const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
// const multer = require('multer');
// const { storage } = require('multer');
// const upload = require('../config/multer-config');

router.get("/admin", function(req, res) {
    let success = req.flash("success")
    res.render("createproducts", {success});
});


router.post("/create", async function(req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 1){ 
       return res 
        .status(503)
        .send("You are not authorized to create a new owner");
    }

    let {fullname, email, password} = req.body;

    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
    });
    res.status(201).send(createdOwner);
});

router.get('/allowners', async function(req, res){
    let owner = await ownerModel.find();
    res.send(owner);
})

// router.post('/createproduct', async function(req, res){
//     try {
//         const {image, name, price, isdiscounted, bgcolor, panelcolor, textcolor} = req.body;
        
//         let owner = await ownerModel.findOne();

//         if(owner){
//             owner.products.push({name, price, isdiscounted, bgcolor, panelcolor, textcolor});
//             await owner.save();

//             req.flash('success', 'Product created successfully!');
//             res.redirect('createproducts');
//         }
//         else{
//             res.status(404).send("Owner not found");
//         }

//     } catch (err){
//         res.status(500).send("Server Error");
//     }
// })



// router.post('/product/create', function (req, res){
//     upload(req, res, (err) => {
//         if (err) 
//             return res.status(400).send('Upload Failed');
//         else res.status(200).send("File Uploaded Successfully")
//     })
// })

module.exports = router;