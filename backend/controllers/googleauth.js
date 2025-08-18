const User = require('../models/user');  // Model ka naam capital rakho
const { Oauth2Client } = require('../utils/googleConfig');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const googlelogin = async (req, res) => {
  try {
    const { code } = req.query;

    // Get access token
    const googleres = await Oauth2Client.getToken(code);
    Oauth2Client.setCredentials(googleres.tokens);

    // Get user info from Google
    const userres = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleres.tokens.access_token}`
    );

    const { email, name } = userres.data;

    // Check if user exists in DB
    let existingUser = await User.findOne({ email });
console.log('New user created:', existingUser);
    if (!existingUser) {
      existingUser = await User.create({ email, name, });
        
    }

    // Generate JWT
    const token = jwt.sign(
      { id: existingUser._id, email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      message: 'Login successful',
      user: existingUser,
      token
    });

  } catch (error) {
    console.error('Error during Google login:', error.response?.data || error);
    res.status(400).json({ 
        message: 'Google login failed', 
        error: error.response?.data || error.message 
    });
}

};

module.exports = { googlelogin };
