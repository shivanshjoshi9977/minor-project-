const express = require("express")
const Router =  express.Router()
const adminController = require("../Controllers/adminController")
Router.get("/login",adminController.login)
Router.post("/register",adminController.register)
module.exports = Router