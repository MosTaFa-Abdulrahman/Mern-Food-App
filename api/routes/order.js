const router = require("express").Router();
const Order = require("../models/Order");
const { OrderStatus } = require("../utils/orderStatus");
const User = require("../models/User");
const { protectedRoute } = require("../utils/protectedRoute");

// Create
router.post("/create", async (req, res) => {
  try {
    const order = req.body;
    if (order.items.length <= 0) res.status(400).send("Cart Is Empty!");

    await Order.deleteOne({
      user: req.userId,
      status: OrderStatus.NEW,
    });

    const newOrder = new Order({ ...order, user: req.userId });
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/delete/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json("Order not found");
    }

    res.status(200).json("Order deleted successfully");
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Order For ((Single User))
router.get("/newOrderForCurrentUser", protectedRoute, async (req, res) => {
  try {
    const order = await Order.findOne({
      user: req.userId,
      status: OrderStatus.NEW,
    });
    if (order) res.status(200).json(order);
    else res.status(400).send("User does not have any Order !!~~!!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pay
router.put("/pay", protectedRoute, async (req, res) => {
  try {
    const { paymentId } = req.body;
    const order = await Order.findOne({
      user: req.userId,
      status: OrderStatus.NEW,
    }).populate("user");

    if (!order) {
      res.status(400).send("Order Not Found!");
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.status(200).json(order._id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Track ((orderId))
router.get("/track/:orderId", protectedRoute, async (req, res) => {
  try {
    const { orderId } = req.params;
    const user = await User.findById(req.userId);

    const filter = {
      _id: orderId,
    };

    // if (!user.isAdmin) {
    //   filter.user = user._id;
    // }

    const order = await Order.findOne(filter);
    if (!order) {
      res.status(400).send("Order Not Found!");
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All ((All Status))
router.get("/allstatus", protectedRoute, async (req, res) => {
  try {
    const allStatus = Object.values(OrderStatus);
    res.status(200).json(allStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Status
router.get("/:status?", protectedRoute, async (req, res) => {
  try {
    const status = req.params.status;
    const user = await User.findById(req.userId);
    const filter = {};

    // if (!user.isAdmin) filter.user = user._id;
    if (status) filter.status = status;

    const orders = await Order.find(filter).sort("-createdAt");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
