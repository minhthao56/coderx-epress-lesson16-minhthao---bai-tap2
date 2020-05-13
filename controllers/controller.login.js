var shortid = require('shortid');
var db = require('../db');
var express = require('express')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
var bcrypt = require('bcrypt');
var app = express()
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())



module.exports.getlogin = function (req, res, next) {
    res.render("auth/login");
};

module.exports.postlogin = function(req,res, next){
    var email = req.body.email;
    var user = db.get("users").find({email: email}).value();
    if (!user){
        res.render("auth/login",{
           err: "Wrong email",
           values:req.body
        });
    }
    else if (!bcrypt.compareSync(req.body.pass, user.pass)) {
        res.render("auth/login",{
            err: "Wrong Password",
            values:req.body
         });
    }else{
        res.cookie("userId", user.id)
        res.redirect('/books');
    }
}
