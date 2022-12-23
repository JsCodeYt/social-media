const router = require("express").Router();
const postModel = require("../models/Post");

// route: "/", POST
router.post("/", async (req, res) => {
  try {
    const newPost = await postModel.create({
      ...req.body,
    });

    return res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// route: "/", GET
router.get("/", async (req, res) => {
  try {
    const allUser = await postModel.find();

    return res.status(201).json(allUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// route: "/", PUT
router.put("/:id", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post.author === req.body.username) {
      const updatePost = await postModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatePost);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// route: "/", DELETE
router.delete("/:id", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post.author === req.body.username) {
      await postModel.findByIdAndDelete(req.params.id);
      return res.status(201).json("post has been deleted...");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
