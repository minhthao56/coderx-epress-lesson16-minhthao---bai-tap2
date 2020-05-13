
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


module.exports.postAdd = function(req, res, next){
   var user = db.get("users").find({email: req.body.email}).value();
    if (req.body.name.length>30){
        var err = "Không được nhập quá 30 ký tự"
        res.render('users/add',{
            err: err
        })
    }
    else if (user){
        var err = "Email đã tồn tại"
        res.render('users/add',{
            err: err
        })
    }
    else if (req.body.pass.length<8){
        var err = "Mật khấu phải trên 8 kí tự"
        res.render('users/add',{
            err: err
        })
    }
    else{next()}
};



module.exports.checkWrongpass = function(req, res, next){
    var email = req.body.email;
    var user = db.get("users").find({email: email}).value();
    if (user.wrongLoginCount > 4){
        res.render("auth/login-many-times",{
            err: "You wrong password many times. Login again after 30 min",
         });
    }
    else if (!bcrypt.compareSync(req.body.pass, user.pass)){
        db.get('users')
            .find({email: email})
            .assign({wrongLoginCount: parseInt(user.wrongLoginCount+1)})
            .write()
            res.render("auth/login",{
                err: "Wrong pass",
                values: req.body
             });
    }
    
    else{
        next()
    }
}