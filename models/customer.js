// File: customer.js
// Author: S.Rudqvist   Date: 03/14/2021
// Copyright 2021 by Samuel Rudqvist
// 
// This file defines the schema for user objects 
// in the app's database. Legal values for the role 
// property are:
//   * customer
//
// Modification Log:
//
// 03/14/2021: Adapted code from AppDev project

var db = require("../db");

var Customer = db.model("Customer", {
    lname: {type: String, required: true},  // Last name
    fname: {type: String, required: true},  // First name
    username: {type: String, required: true},  // Username, Will need to set min length
    email: {type: String, required: true},
    password: {type: String, required: true},   // Password
    role: {type: String, required: true, default: 'customer'}  // User Role, defaults to customer
});

module.exports = Customer;