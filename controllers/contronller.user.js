var shortid = require('shortid');
var db = require('../db');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var md5 = require('md5');
var bcrypt = require('bcrypt');
app.use(express.json())  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//List book
module.exports.user = function (req, res) {
    res.render("users/user", {
        users: db.get("users").value()

    });
};
// Find
module.exports.find = function(req, res){
    var q = req.query.q;
    var filterlistuser = db.get("users").filter(function(user){
      var lowercase = user.name.toLowerCase();
       return lowercase.indexOf(q) !==-1;
    }).write();
    res.render('users/user',{
        users: filterlistuser
    });
  };
// Detail
module.exports.detail = function (req, res) {
    var id = req.params.id;
    var detailuser = db.get("users").find({id: id}).value()
    res.render("users/detail", {
        user: detailuser
    })    
  };
  //Add user
module.exports.getAdd = function(req, res){
    res.render('users/add')
};
module.exports.postAdd = function(req, res){
    req.body.pass = bcrypt.hashSync(req.body.pass, 10)
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write()
    res.redirect('/users')
    
  };
//Detele
module.exports.dislaydetele = function (req, res) {
    res.render("users/delete", {
        users: db.get("users").value()
    });
};
module.exports.deteleitem = function (req, res) {
    var id = req.params.id;
    db.get("users").remove({id: id}).write();
    res.redirect('/users/delete');
};
//  Update
module.exports.displayupdate = function (req, res) {
    res.render("users/update", {
        users: db.get("users").value()

    });
};