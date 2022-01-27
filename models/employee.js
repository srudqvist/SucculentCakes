// File: employee.js
// Author: S.Rudqvist   Date: 03/14/2021
// Copyright 2021 by Samuel Rudqvist
// 
// This file defines the schema for user objects 
// in the app's database. Legal values for the role 
// property are:
//   * employee
//   * supervisor
//
// Modification Log:
//
// 03/14/2021: Adapted code from AppDev project

var db = require("../db");

var Employee = db.model("Employee", {
    lname: String,  // Last name
    fname: String,  // First name
    email: {type: String, required: true},  // Email, Will need to set min length
    password: {type: String, required: true},   // Password
    role: {type: String, required: true, default: 'employee'}  // User Role, defaults to employee
});

module.exports = Employee;