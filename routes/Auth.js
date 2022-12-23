const router = require("express").Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");

// route: "/register", POST
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const newUser = await userModel.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, salt),
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route: "/login", POST,
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user) {
      const validate = await bcrypt.compare(password, user.password);
      if (validate) {
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
