const userModel = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// route: "/", GET,
router.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route: "/", PUT
router.put("/:id", async (req, res) => {
  try {
    if (req.params.id === req.body.userId) {
      const salt = await bcrypt.genSalt(10);
      const updateUser = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
          password: await bcrypt.hash(req.body.password, salt),
        },
        { new: true }
      );

      res.status(200).json(updateUser);
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// route: "/", DELETE
router.delete("/:id", async (req, res) => {
  try {
    if (req.params.id === req.body.userId) {
      await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted...");
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// follow
router.put("/follow/:id", async (req, res) => {
  try {
    if (req.params.id !== req.body.userId) {
      if (!author.followers.includes(req.body.userId)) {
        const updateAuthor = await userModel.findByIdAndUpdate(
          req.params.id,
          {
            $push: { followers: req.body.userId },
          },
          { new: true }
        );
        const followUser = await userModel.findByIdAndUpdate(
          req.body.userId,
          {
            $push: { followers: req.params.id },
          },
          { new: true }
        );
        return res.status(200).json([updateAuthor, followUser]);
      } else {
        return res.sendStatus(403);
      }
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// un follow
router.put("/unfollow/:id", async (req, res) => {
  try {
    if (req.params.id !== req.body.userId) {
      if (author.followers.includes(req.body.userId)) {
        const updateAuthor = await userModel.findByIdAndUpdate(
          req.params.id,
          {
            $pull: { followers: req.body.userId },
          },
          { new: true }
        );
        const updateFollowers = await userModel.findByIdAndUpdate(
          req.body.userId,
          {
            $pull: {
              follow: req.params.id,
            },
          },
          { new: true }
        );
        return res.status(200).json([updateAuthor, updateFollowers]);
      } else {
        return res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
