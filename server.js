const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
var bookRouters = require("./routes/books.route");
var userRouters = require("./routes/users.route");
var transactionsRouters = require("./routes/transactions.route");
var authRouters = require("./routes/login.router");
var loginmiddleware = require("./middleware/middleware.login")

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json())  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Trang chủ
app.get("/",function (req, res){
    res.render("index")    
});

app.use("/books",bookRouters);
app.use("/users",userRouters);
app.use("/trans",transactionsRouters);
app.use("/auth", authRouters)

//Satic file
app.use(express.static('public'))
// Listening
app.listen(port, function(){
    console.log('Server listen on port' + port);
  });
  