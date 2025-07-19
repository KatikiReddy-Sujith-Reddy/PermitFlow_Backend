const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const JWT_SECRET = process.env.JWT_SECRET||'258cd5f5d157fb4b15f9f90f58d8528f9327f10e7e5ebede2eb02514cb24ed4e3318061f4fdbc17e15729a05e019b6a017804239d54b8fbf4f24eeed1c7b9d35'
console.log(JWT_SECRET);
// POST /api/v1/auth/authenticate
router.post('/authenticate', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('Using collection:', User.collection.name);   // debug collection name
    console.log('Login attempt:', { username, password });

    const user = await User.findOne({ username });
    console.log('User found:', user);

    if (!user) {
      console.log('No user with that username');
      return res.status(403).json({ message: 'Invalid username or password' });
    }

    // For now, password is plain text, so simple compare
    if (password !== user.password) {
      console.log('Password mismatch');
      return res.status(403).json({ message: 'Invalid username or password' });
    }

    // Create JWT payload
    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
      branch: user.department,
      name: user.name,
      photo: user.image,
    };

    // Sign JWT token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Send token and user info
    res.json({
      accessToken: token,
      role: user.role,
      branch: user.department,
      name: user.name,
      photo: user.image,
    });
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
