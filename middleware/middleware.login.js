var shortid = require('shortid');
var db = require('../db');
var express = require('express')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())



module.exports.mustlogin = function(req, res, next){
    var user = db.get("users").find({id: req.cookies.userId}).value();
    
    if (!req.cookies.userId){
        res.redirect('/auth/login');
    }
    else if (!user){
        
        res.redirect('/auth/login');
    }else {
        next()
    }
}
module.exports.notIntoTrans = function(req, res, next){
    var user = db.get("users").find({id: req.cookies.userId}).value();
    var dbtransOfuser = db.get("trans").filter({userId: user.id}).value();
    var bookOfuser=[];
    for ( tran of dbtransOfuser){
        var Objbook=db.get("titles").find({id: tran.bookId}).value();
        bookOfuser.push(Objbook)
    }
    if (user.isAdmin==="false"){
        res.render("transactions/transOfuser", {
            dbtransOfuser: dbtransOfuser,
            name: user.name,
            bookOfuser: bookOfuser
        });
    }else {next()}
}