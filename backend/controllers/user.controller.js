import User from "../models/user.model.js";

export const getUsersforSideBar=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        console.log(filteredUsers);
        res.status(200).json(filteredUsers)
    }catch(error){
        console.log("error in getmessages_controller", error.message);
        res.status(500).json({ error: "Internal server errror" })
    }
}