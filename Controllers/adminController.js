const adminModel = require("../models/Admin")
exports.login = async (req , res)=>{
    const {email, password} = req.body
    try {
        let admin = await adminModel.findOne({email})
        if (!admin){
            return res.status(400).json({msg:"INVALID CREDENTIALS"})
        }
        // const isMatch = await admin.comparePassword(password)
        // const isMatch = password === admin.password
        if ((password != admin.password)){
            return res.status(400).json({msg:"INVALID CREDENTIALS"})
        }
        // const token = admin.generateAuthToken()
        res.status(200).json({msg:"LOGGED IN SUCCESSFULLY"})
    } catch (err) {
        console.error(err)
        return res.status(500).send("SERVER ERROR")
    }

}
exports.register = async (req , res)=>{
    const {fullName , email, password ,contact} = req.body
    console.log(req.body)
    try {
        let admin = await adminModel.findOne({email})
        if (admin){
            return res.status(400).json({msg:"USER ALREADY EXIST"})
        }
        admin = new adminModel({fullName , email, password ,contact})
        await admin.save()
        return res.status(200).json({msg:"REGISTERED SUCCESSFULLY"})
    } catch (err) {
        console.error(err)
        return res.status(500).send("SERVER ERROR")
    }
    
    
}