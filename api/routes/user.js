const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// Upadte
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  // if(req.user.id === req.params.id || req.user.isAdmin) {
  // }
  // the user may have changed their password so we need to check this
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PAS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted..");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new; // new is the name I want to give to the query
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find(); // to limit the users searched
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get useres stats per months
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date(); // current date
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      // method aggregate fro mongo to group my items
      { $match: { createdAt: { $gte: lastYear } } }, // condition greater than lastYear
      {
        $project: {
          month: { $month: "$createdAt" }, // we assign the month to the month variable from createdAt
        }, // this take the month number from createdAt
      },
      {
        // now we can group our items
        $group: {
          _id: "$month", // id will be the month because will be unique
          total: { $sum: 1 }, // now we use sum method
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
