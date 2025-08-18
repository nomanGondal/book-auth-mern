const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Token format: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; //  payload se userId set
    console.log("Authenticated user ID:", req.userId);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
