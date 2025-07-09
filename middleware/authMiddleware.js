const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    if (!token.startsWith("Bearer")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const actualToken = token.split(" ")[1];

    const decodedToken = jwt.verify(actualToken, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
