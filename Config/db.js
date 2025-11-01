const mongoose =  require("mongoose");
const db = async () => {
    try{
        await mongoose.connect("mongodb+srv://shivanshjoshi9977:12345@cluster0.h6slwuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

        console.log("MongoDB connected");
    }
    catch(error){
        console.log(error.message); 
        process.exit(1)
    }
}
module.exports = db;
