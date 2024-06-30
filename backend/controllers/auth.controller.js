// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import generateTokenAndSetCookie from "../utils/generateToken.js";

// export const sign = async (req, res) => {
//     try {
//         const { fullname, username, password, confirmPassword, gender } = req.body;

//         // console.log("Received signup data:", { fullname, username, password, confirmPassword, gender });

//         if (password !== confirmPassword) {
//             return res.status(400).json({ error: "Passwords don't match" });
//         }

//         const user = await User.findOne({ username });
//         if (user) {
//             return res.status(400).json({ error: "User already exists" });
//         }

//         const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
//         const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             fullname,
//             username,
//             password: hashedPassword,
//             gender,
//             profilepic: gender === "Male" ? boyPic : girlPic
//         });

//         if (newUser) {
//             generateTokenAndSetCookie(newUser._id, res);
//             await newUser.save();
//             res.status(201).json({
//                 _id: newUser._id,
//                 fullname: newUser.fullname,
//                 username: newUser.username,
//                 profilepic: newUser.profilepic
//             });
//         } else {
//             res.status(400).json({ error: "Invalid user data" });
//         }
//     } catch (e) {
//         console.error(e); // Log the error for debugging purposes
//         res.status(500).json({ error: "Internal server error" });
//     }
// };


// export const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username });
        
//         if (!user) {
//             return res.status(400).json({ error: "Invalid username or password" });
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
//         if (!isPasswordCorrect) {
//             return res.status(400).json({ error: "Invalid username or password" });
//         }

//         generateTokenAndSetCookie(user._id, res);

//         res.status(200).json({
//             _id: user._id,
//             fullname: user.fullname,
//             username: user.username,
//             profilepic: user.profilepic
//         });
//     } catch (e) {
//         console.error(e); // Log the error for debugging purposes
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// export const logout = async (req, res) => {
//     try{
//         res.cookie("jwt","",{maxAg:0});
//         res.status(200).json({message:"logout successfully"})
//     }catch(error){
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const sign = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilepic: newUser.profilepic
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (e) {
        console.error(e); // Log the error for debugging purposes
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilepic: user.profilepic
        });
    } catch (e) {
        console.error(e); // Log the error for debugging purposes
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

