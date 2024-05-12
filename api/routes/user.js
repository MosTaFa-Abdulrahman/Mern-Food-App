const router = require("express").Router();
const User = require("../models/User");
const { verifyUser, protectedRoute } = require("../utils/protectedRoute");

// Get All Users
router.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    if (users) return res.status(200).json(users);
    else res.status(400).json({ error: "Users Not Found 😣" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get By ((Username))
router.get("/find/:id", verifyUser, async (req, res) => {
  try {
    const getUser = await User.findOne({ id: req.params.id });
    if (getUser) return res.status(200).json(getUser);
    else res.status(400).json({ error: "User Not Found 😣" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put("/update/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Block
router.put("/toggleBlock/:userId", protectedRoute, async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId === req.userId) {
      res.status(401).send("Can't block yourself!");
      return;
    }

    const user = await User.findById(userId);
    user.isBlocked = !user.isBlocked;
    user.save();

    res.status(200).json(user.isBlocked);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
