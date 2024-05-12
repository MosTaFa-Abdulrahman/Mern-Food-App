const router = require("express").Router();
const Food = require("../models/Food");

// Create
router.post("/create", async (req, res) => {
  try {
    const { tags, origins } = req.body;

    const food = new Food({
      ...req.body,
      origins: origins.split ? origins.split(",") : origins,
      tags: tags.split ? tags.split(",") : tags,
    });
    await food.save();

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put("/update/:id", async (req, res) => {
  try {
    const foodUpdated = await Food.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(foodUpdated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const foodDeleted = await Food.findByIdAndDelete(req.params.id);

    res.status(200).json(foodDeleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All
router.get("/get/all", async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single
router.get("/get/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search  ((searchTerm))
router.get("/search/:searchTerm", async (req, res) => {
  try {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i");
    const foods = await Food.find({ name: { $regex: searchRegex } });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search  ((tag))
router.get("/tag/:tag", async (req, res) => {
  try {
    const { tag } = req.params;
    const foods = await Food.find({ tags: tag });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Tags
router.get("/find/tags", async (req, res) => {
  try {
    const tags = await Food.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await Food.countDocuments(),
    };

    tags.unshift(all);

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
