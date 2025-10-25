const mongoose =  require("mongoose");
const AdminSchema = new mongoose.Schema({
    fullName : String,
    email : String,
    password : String,
    contact : String
})
module.exports = mongoose.model("admin",AdminSchema);