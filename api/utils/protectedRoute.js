const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Unauthorized 😌" });

    jwt.verify(token, process.env.JWT_SEC, (err, payload) => {
      if (err) return res.status(403).json("Token is not valid ~!");
      req.userId = payload.id;
      req.isSeller = payload.isSeller;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify User
const verifyUser = (req, res, next) => {
  protectedRoute(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) next();
    else return res.status(403).json("You are not authorized (User) ~!");
  });
};

// Verify Admin
const verifyAdmin = (req, res, next) => {
  protectedRoute(req, res, () => {
    if (req.user.isAdmin) next();
    else return res.status(403).json("You are not authorized (Admin) ~!");
  });
};

module.exports = { protectedRoute, verifyUser, verifyAdmin };
