const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// ✅ REGISTER USER
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('📥 Received Registration Request:', req.body);

  if (!username || !password) {
    console.log('⛔ Missing username or password');
    return res.status(400).json({ error: 'Username and password are required' });
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    console.log('⛔ Invalid username format');
    return res.status(400).json({ error: 'Username can only contain letters, numbers, and underscores' });
  }
  if (password.length < 6) {
    console.log('⛔ Password too short');
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    console.log('🔍 Checking if user exists...');
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('⛔ Username already exists:', username);
      return res.status(400).json({ error: 'Username already exists' });
    }

    console.log('✅ Creating new user...');
    const newUser = new User({ username, password });
    await newUser.save();
    console.log('✅ User registered successfully:', username);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log('❌ Error while registering user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ LOGIN USER
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('📥 Received Login Request:', req.body);

  if (!username || !password) {
    console.log('⛔ Missing username or password');
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('⛔ User not found:', username);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('🔑 Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('⛔ Invalid password');
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    console.log('✅ Login successful for:', username);

    res.status(200).json({ token, username: user.username });
  } catch (err) {
    console.log('❌ Error while logging in:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
