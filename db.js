// File: db.js
// Author: S. Rudqvist    Date: 03/09/2021
// Copyright 2021 by Samuel Rudqvist
//
// This file defines the database connection for the app.
// 
// Modification Log:
// 03/09/2021: Reused code from school. s. Rudqvist
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/succulent_cakes", { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;