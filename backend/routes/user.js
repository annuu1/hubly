const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/new', async (req, res) => {
  const { fullName, phone, email, role } = req.body;
  try {
    if (!fullName || !phone || !email || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const existingUser  = await User.findOne({ 
      $or: [
        { email: email }, 
        { phone: phone } 
      ] 
    });
    
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const user = new User({ fullName, phone, email, role, password: '' });
    await user.save();
    res.status(201).json({ success: true, message: 'User created' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
);
// Get all members

router.get('/members', async (req, res) => {
  try {
    const users = await User.find({role: 'member'}).select('fullName phone email role');
    if (!users) {
      return res.status(404).json({ success: false, message: 'No users found' });
    }
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



module.exports = router;