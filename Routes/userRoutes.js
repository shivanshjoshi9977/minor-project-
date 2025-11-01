const express = require("express")
const Router =  express.Router()
const userController = require("../Controllers/userController")
Router.post("/login",userController.login)
Router.post("/register",userController.register)
Router.post("/myprofile",userController.myprofile)
Router.post("/updateprofile",userController.updateProfile)
Router.get("/allUsers",userController.allUsers)

module.exports = Router