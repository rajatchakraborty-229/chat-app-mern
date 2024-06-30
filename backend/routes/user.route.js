import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsersforSideBar, uploadProfilePicture } from '../controllers/user.controller.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Route to get users for the sidebar
router.get('/', protectRoute, getUsersforSideBar);

// Route to upload profile picture
router.post('/upload-profile-picture', protectRoute, upload.single('profilepic'), uploadProfilePicture);

export default router;
