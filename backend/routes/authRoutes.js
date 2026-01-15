import express from "express";
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

import { registerUser, loginUser } from "../config/controllers/authController.js";


// POST /api/auth/register
router.post("/register", registerUser);


router.post("/login", loginUser);

router.post('/reset-password', async (req, res) => {
    try {
      const { username, newPassword } = req.body;
  
      if (!username || !newPassword) {
        return res.status(400).json({ message: 'Username and new password are required.' });
      }
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      return res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
export default router;
