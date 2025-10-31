const express = require("express")
const db = require("./Config/db")
const userRoutes = require("./Routes/userRoutes")
const adminRoutes = require("./Routes/adminRoutes")
const complaintRoutes = require("./Routes/complaintRoutes")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(cors())
db()
app.use(bodyParser.json())
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)
app.use("/complaint",complaintRoutes)
const port = 3000
app.listen(port,()=> console.log("Server started"))






