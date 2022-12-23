const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImg: { type: String, required: false },
    followers: { type: Array, required: false },
    follow: { type: Array, required: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", Schema);
