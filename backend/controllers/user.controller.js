import User from '../models/user.model.js';
import cloudinary from '../config/cloudinary.js';

export const getUsersforSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error('Error in getUsersforSideBar controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const uploadProfilePicture = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the previous profile picture from Cloudinary
        if (user.cloudinary_id) {
            await cloudinary.uploader.destroy(user.cloudinary_id);
        }

        // Update user's profile picture and Cloudinary ID
        user.profilepic = req.file.path;
        user.cloudinary_id = req.file.filename;

        await user.save();

        res.status(200).json({ profilepic: user.profilepic });
    } catch (error) {
        console.error('Error in uploadProfilePicture controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
