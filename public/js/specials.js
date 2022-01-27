// File: specials.js
// Author: Samuel Rudqvist
// Copyright 2021 by Samuel Rudqvist
// 
// This file creates a customer user.
//
// Modification Log:
//

//const { contentType } = require("express/lib/response");
//const { stringify } = require("querystring");

$(()=> {
    // create an instance of the specials page
    specialsSPApp = new SPApp("Succulent Cakes");
    specialsSPApp.initialize();
});

class SPApp {
    constructor(name) {
        this.title = name;
    }

    get getTitle() {
        return this.title;
    }

    initialize () {

        let navbar = $(".navbar");
        $(window).scroll(function(){
            let oTop = $(".section-2").offset().top-window.innerHeight;
            if($(window).scrollTop() > oTop){
                console.log('here');
                navbar.addClass("sticky");
                console.log('here2');
            }else{
                navbar.removeClass("sticky");
                console.log('here3');
            }
        });

        $('#signup-btn').click(() => {
            console.log("sign-up-success is now hidden");
            $('#sign-up-success').hide();
        })
        // code to initialize the app goes here, event listeners etc
        console.log(`${this.getTitle} app initialized`);

        // Sign up a customer
        $('#signup-form').submit((event) => {
            console.log("Sign Up Pressed");
            event.preventDefault();
            let newCustomer = {
                fname: $('#fname').val(),
                lname: $('#lname').val(),
                username: $('#username-sign-up').val(),
                email: $('#email-sign-up').val(),
                password: $('#password-sign-up').val() 
            }

            $.ajax({
                url: "api/customer",
                method: "POST",
                data: JSON.stringify(newCustomer),
                contentType: "application/json",
                dataType: "json"
            })
            .done((data, statusText, xhr) => {
                console.log(`Returned message: ${data.msg} Status Code: ${xhr.status}` );
                if (xhr.status == 201) {
                    console.log("it worked");
                    $('#sign-up-success').show();
                }
            })
            .fail((xhr) => {
                if(xhr == 400) {
                    console.log("something went wrong");
                }
            });
        });

        // Sign in a customer
        $('#signin-form').submit((event) => {
            console.log("Sign in pressed.");
            event.preventDefault();

            // Customer username and password to pass to auth api
            let customer = {
                email: $("#username").val(),
                password: $("#password").val()
            }
            // Save the customer's email in local storage
            window.localStorage.setItem("email", customer.email);
            // Make the api call
            $.ajax({
                url: "api/auth",
                method: "POST",
                data: JSON.stringify(customer),
                contentType: "application/json",
                dataType: "json"
            })
            .done((data, statusText, xhr) => {
                console.log(`Returned message: ${data.msg} Status Code: ${xhr.status}` );
                // If login is authenticated, save the first name to local storage 
                // and redirect to 
                if (xhr.status == 200){
                    window.localStorage.setItem("fName",data.fname);
                    window.location.replace("specials2.html");
                }
            })
            .fail((xhr, statusText) => {
                if (xhr.status == 401 || xhr.status == 400){

                    $('#log-in-modal').modal('show');
                    $('#auth-error').removeClass('hide');
                    window.localStorage.removeItem("email");
                }
            })

        });

        // hide the auth-error when username or password changes 
        $('#username, #password').focus((event) =>{
            $('#auth-error').addClass('hide');
        });
    }
}