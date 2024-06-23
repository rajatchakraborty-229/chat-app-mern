import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const sign = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyPic : girlPic
        });

        if(newUser){
             generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            });
        }else{
            res.status(400).json({error:"Invalid user data"})
        }

    

    } catch (e) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try{
        const {userName,password}=req.body;
        const user=await User.findOne({userName});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password||"");
        if(!user||!isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        })

    }catch(e){
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try{
        res.cookie("jwt","",{maxAg:0});
        res.status(200).json({message:"logout successfully"})
    }catch(error){
        res.status(500).json({ error: "Internal server error" });
    }
};
