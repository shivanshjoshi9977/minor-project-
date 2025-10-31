const { response } = require("express")
const userModel = require("../models/Users")
exports.register = async (req , res)=>{
    const {fullName , email, password ,contact} = req.body
    try {
        let user = await userModel.findOne({email})
        if (user){
            return res.status(400).json({msg:"USER ALREADY EXIST"})
        }
        user = new userModel({fullName , email, password ,contact})
        await user.save()
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("SERVER ERROR")
    }
    
    
}
exports.login = async (req , res)=>{
    const {email, password} = req.body
    console.log(req.body);
    
    try {
        let user = await userModel.findOne({email})
        console.log(user);
        if (!user){
            return res.status(400).json({msg:"INVALID CREDENTIALS"})
        }
        if ((password != user.password)){
            return res.status(400).json({msg:"INVALID CREDENTIALS"})
        }
        // const token = user.generateAuthToken()
        return res.status(200).json({msg:"LOGIN SUCCESSFUL"})
    } catch (err) {
        return res.status(500).send("SERVER ERROR")
    }

}