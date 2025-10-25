const mongoose =  require("mongoose");
const userSchema = new mongoose.Schema({
    fullName : String,
    email : String,
    password : String,
    contact : String
})
module.exports = mongoose.model("user",userSchema);
