const express = require("express")
const Router =  express.Router()
const complaintController = require("../Controllers/complaintController")
Router.post("/newcomplaint",complaintController.registerNewComplaint)
Router.post("/fetchallcomplaint",complaintController.fetchAllComplaint)
Router.post("/fetchallstats",complaintController.fetchAllStats)
Router.post("/fetchMyComplaints",complaintController.fetchMyComplaints)
module.exports = Router