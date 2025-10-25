const { response } = require("express")
const userModel = require("../models/Users")
exports.register = async (req , res)=>{
    const {fullName , email, password ,contact} = req.body
    try {
        let user = await userModel.findOne({email})
        if (user){
            return res.status(400).json({msg:"USER ALREADY EXIST"})
        }
        user = new User({fullName , email, password ,contact})
        await user.save()
    } catch (err) {
        return res.status(500).send("SERVER ERROR")
    }
    
    
}
exports.login = async (req , res)=>{
    const {email, password} = req.body
    try {
        let user = await userModel.findOne({email})
        if (!user){
            return res.status(400).json({msg:"INVALID CREDENTIALS"})
        }
        const isMatch = await user.comparePassword(password)
        if (!isMatch){
            return res.status(400).json({msg:"INVALID CREDENTIALS"})
        }
        // const token = user.generateAuthToken()
        res.json({token})
    } catch (err) {
        return res.status(500).send("SERVER ERROR")
    }

}