// File: auth.js
// Author:  S. Rudqvist   Date: 03/16/2021
// Copyright 2021 Samuel Rudqvist
// 
// This file defines a route to authenticate a user.
// API
//  Resource   Req Verb  Description               Status Code
//  /auth        POST    Authenticate User         200 (user authenticated)
//                                                 401 (authentication failed)
//
// Modification Log:
//


const bodyParser = require("body-parser");
const router = require("express").Router();
const Customer = require("../models/customer");
const Employee = require("../models/employee");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const secret = "myCoolSecret";  // the secret used to encode the JWTs... should be something secret

router.use(bodyParser.json());

router.post('/', async (req, res) => {
    console.log(`Auth requested for ${req.body.email}`)
    if (!req.body.email || !req.body.password) {
        res.status(401).json({ error: "Missing email and/or password"});
        return;
    }
    let customer = await Customer.findOne({email: {$eq: req.body.email}});
    let employee = await Employee.findOne({email: {$eq: req.body.email}});

    if (customer) {
        console.log(customer);
        if (bcrypt.compareSync(req.body.password, customer.password)) {
            console.log(req.body.password);
            console.log(customer.password);
            const token = jwt.encode({username: req.body.email, password: req.body.password}, secret);
            res.status(200).json({msg: 'Customer authenticated',
                                    fname: customer.fname,
                                    lname: customer.lname,
                                    role: customer.role,
                                    token: token});
        }
        else {
            res.status(401).json({msg: 'Customer unauthorized'});
        }
    }
    else if (employee) {
        console.log(employee);
        if (bcrypt.compareSync(req.body.password, employee.password)) {
            console.log(req.body.password);
            console.log(employee.password);
            const token = jwt.encode({username: req.body.username, password: req.body.password}, secret);
            res.status(200).json({msg: 'Employee authenticated',
                                    fname: employee.fname,
                                    lname: employee.lname,
                                    role: employee.role,
                                    token: token});
        }
    }
    else {
        res.status(401).json({msg: 'user unauthorized'});
    }

    
})
module.exports = router;