const { response } = require("express")
const userModel = require("../models/Users")


exports.register = async (req, res) => {
    const { fullName, email, password, contact } = req.body
    try {
        let user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: "USER ALREADY EXIST" })
        }
        user = new userModel({ fullName, email, password, contact })
        await user.save()
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("SERVER ERROR")
    }


}
exports.login = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body);

    try {
        let user = await userModel.findOne({ email })
        console.log(user);
        if (!user) {
            return res.status(400).json({ msg: "INVALID CREDENTIALS" })
        }
        if ((password != user.password)) {
            return res.status(400).json({ msg: "INVALID CREDENTIALS" })
        }
        // const token = user.generateAuthToken()
        return res.status(200).json({ msg: "LOGIN SUCCESSFUL" })
    } catch (err) {
        return res.status(500).send("SERVER ERROR")
    }

}




exports.allUsers = async (req , res)=>{
    try {
        const users = await userModel.find()
        return res.status(200).json(users)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("SERVER ERROR")
    }
}

exports.myprofile = async (req, res) => {
    const email = req.body.userEmail
    try {
        const user = await userModel.find({ email })
        console.log(user)
        return res.status(200).json(user)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("SERVER ERROR")
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { userEmail, fullName, contact, password} = req.body;

        if (!userEmail) {
            return res.status(400).json({ message: "userEmail is required" });
        }

        const user = await userModel.findOne({ email: userEmail });


        if (password != user.password) {
            console.log("passowrd: ", password)
            console.log("Database passowrd", user.password)
            return res.status(401).json({ message: "Invalid passowrd" });
        }

        // Prepare update fields dynamically
        const updateFields = {};
        if (fullName) updateFields.fullName = fullName;
        if (contact) updateFields.contact = contact;
        if (password) updateFields.password = password;

        const updatedUser = await userModel.findOneAndUpdate(
            { email: userEmail },
            { $set: updateFields },
            { new: true } // return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};