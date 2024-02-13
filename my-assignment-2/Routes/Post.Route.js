const express = require("express");
const Post = require("../Models/Post.model");
const VerifyToken = require("../middleware/VerifyToken");

const Router = express.Router();

// CRUD OPERATION USING FOR API
// to get all post of a particular user
Router.get("/post", VerifyToken, async (req, res) => {
  try {
    const post = await Post.find({ user: req.user });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//  copy the tokan and put the header and pass to the body all the model
Router.post("/post", VerifyToken, async (req, res) => {
  try {
    const { title, body, image } = req.body;
    const newPost = await Post.create({
      title,
      body,
      image,
      user: req.user,
    });
    res.status(200).json({
      mgs: "Post created succesfull ",
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// put method for update
Router.put("/post/:postid", VerifyToken, async (req, res) => {
  try {
    console.log(req.params.postid);
    const { title, body, image } = req.body;
    const updatePost = await Post.findByIdAndUpdate(
      {
        _id: req.params.postid,
      },
      { title, body, image }
    );
    res.status(200).json({
      mgs: "updated successfull",
    });
  } catch (error) {
    res.status(400).json({
      mgs: " update failed",
    });
  }
});
//   copy to id and past in url then press enter
Router.delete("/post/:postid", VerifyToken, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete({
      _id: req.params.postid,
    });
    res.status(200).json({ mgs: "deleted successfull" });
  } catch (error) {
    res.status(400).json({
      mgs: "delete failed",
    });
  }
});

module.exports = Router;
