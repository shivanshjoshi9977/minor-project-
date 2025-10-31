const complaintModel = require("../Models/complaintModel")
exports.registerNewComplaint = async (req , res)=>{
    const {complaintId,userEmail,issueTitle , Category, description, Location } = req.body
    try {
        let complaint = await complaintModel.findOne({complaintId})
        if (complaint){
            return res.status(400).json({msg:"COMPLAINT ALREADY EXISTS"})
        }
        complaint = new complaintModel({complaintId,userEmail,issueTitle , Category, description, Location })
        await complaint.save()
        return res.status(200).json({msg:"COMPLAINT REGISTERED SUCCESSFULLY"})  
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("SERVER ERROR")
    }
}
exports.fetchAllComplaint = async (req , res)=>{
    try {
        const complaints = await complaintModel.find()
        return res.status(200).json(complaints)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("SERVER ERROR")
    }
}
exports.fetchAllStats = async (req , res)=>{
    try {
        const complaints = await complaintModel.find()
        const stats = {
            total: complaints.length,
            pending: complaints.filter(c => c.status === "Pending").length,
            inProgress: complaints.filter(c => c.status === "In Progress").length,
            resolved: complaints.filter(c => c.status === "Resolved").length
        }
        return res.status(200).json({stats})
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("SERVER ERROR")
    }
}
exports.fetchMyComplaints = async (req , res)=>{
    const userEmail = req.body.userEmail
    try {
        const complaints = await complaintModel.find({userEmail})
        return res.status(200).json(complaints)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("SERVER ERROR")
    }
}