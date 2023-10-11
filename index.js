require("dotenv").config()
const passport = require('./middleware/config.passport')

const setupDb = require("./db/dbconfig")
const expressSession = require('express-session');
const express = require("express")

const mainRouter = require("./route/main.route")
setupDb()

const app = express();

app.use(express.json());

app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());

app.use(passport.session());
  
app.use("/",mainRouter)

app.listen(8080,()=>console.log("server is listening on port "))
