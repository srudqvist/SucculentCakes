// File: server.js 
// Author: S. Rudqvist  Date: 03/09/2021
//
// server.js contains the code for the Succulent Cakes Server component
// of the Succulent Cakes application.  Responsibilities of
// the server are:
//
//   1. Server the static web pages in the web component of 
//      the system.
//   2. Provide the SC API for both the web and the mobile
//      components of the system.
//
// Modification Log:


// import the express server
const express = require("express");
const bodyParser = require("body-parser");

// application constants
const PORT = 3000;

// create the http app
const app = express();

// set up a route to serve static pages from the public folder
app.use(express.static("public"));

// add a router
const router = express.Router();

// create API routes
router.use("/api/customer", require("./api/customer"));
router.use("/api/auth", require("./api/auth"));

// use the router in the app
app.use(router);

app.listen(PORT, (err) => {
    if (err) 
        console.log("Server startup failed.");
    else 
        console.log(`Server listening on port ${PORT}`);
});


// Tips
// ls -al
// npm init
// entry point: server.js
// license MIT
// author: S. Rudqvist
// npm install express

// start a 2:nd bash cell to run terminal 
// start server: node server.js
// every time that code changes in server.js the server need to be stopped and then started again
// stop server: ctrl c
// ctrl d or exit will exit the server in the terminal and close the terminal
// if it stops working try, sudo killall -9 node
// npm install mongoose

// 1: bash, cd .. to back through directories into the directory appdev and projects
// mongod -dbpath . to start the db from the right directory
// 2: bash, 
// 3: bash, 