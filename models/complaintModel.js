const mongoose =  require("mongoose");
const complaintSchema = new mongoose.Schema({
    complaintId : String,
    userEmail : String,
    issueTitle : String,
    Category : String,
    description : String,
    Location : String,
    status : {type:String, default:"Pending"}
})
module.exports = mongoose.model("complaint",complaintSchema);