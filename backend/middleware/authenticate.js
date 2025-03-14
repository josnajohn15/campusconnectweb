const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure you load environment variables

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: 'Access Denied' });

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
  if (!token) return res.status(401).json({ error: 'Token Missing' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid Token' });
  }
};

module.exports = authenticateToken;
