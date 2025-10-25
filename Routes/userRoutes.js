const express = require("express")
const Router =  express.Router()
const userController = require("../Controllers/userController")
Router.get("/login",userController.login)
Router.post("/register",userController.register)
module.exports = Router