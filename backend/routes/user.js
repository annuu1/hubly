const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/test', (req, res) => {
  try {
    res.json({ success: true, message: 'Test route working' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message }); 
  }
});

router.get('/members', async (req, res) => {
  try {
    const users = await User.find({role: 'member'}).select('name phone email role');
    if (!users) {
      return res.status(404).json({ success: false, message: 'No users found' });
    }
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



module.exports = router;