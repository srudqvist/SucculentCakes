// File: customer.js
// Author: S. Rudqvist  Date: 03/15/2021
// Copyright Samuel Rudqvist
// 
// This file defines a route to create a customer user.
// API
// Resource     Req Verb    Description         Status Code
// /signup       POST       Create Customer     201 (Created)
//                                              400 
//
// Modification Log:
//


const bodyParser = require("body-parser");
const router = require("express").Router();
const Customer = require("../models/customer");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const secret = "myCoolSecret";  // the secret used to encode the JWTs... should be something secret

router.use(bodyParser.json());

// Add a new customer to the database
router.post('/', async (req, res) => {
    console.log(`Called save new customer route`);
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ error: "Missing username and/or password"});
        return;
    }

    let customer = await Customer.findOne({username: req.body.username});
    if (customer) {
        console.log("This username already exists.");
        res.status(401).json({Error: "This username already exists."})
    }
    else {
        console.log("here1");
        // create a hash for the submitted password
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newCustomer = new Customer({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            username: req.body.username,
            password: hash,
            role: 'customer'
        });
        newCustomer.save(function(err) {
            console.log("here");
            if(err) {
                res.status(400).json({msg: "Something went wrong"});
            }
            else{
                console.log(newCustomer);
                res.status(201).json({msg: "Customer account created"}); // new customer account created
            }    
        });
    }
        
});

module.exports = router;