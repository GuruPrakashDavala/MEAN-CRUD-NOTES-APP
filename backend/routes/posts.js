const express = require("express");
const Post = require("../models/post");
const router = express.Router();

router.post("", (req, res, next) => {
  //const post = req.body;

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  // const product = new Product({
  //   title: req.body.title,
  //   content: req.body.content
  // });

  console.log(post);
  //console.log(product);
  post.save().then((response) => {
    console.log(response);
    res.status(200).json({
      CreatedPostId: response._id,
      message: "Post Added Successfully!",
    });
  });
});

router.get("", (req, res, next) => {
  // const posts = [
  //   {
  //     id: "id1",
  //     title: "harry potter",
  //     content: "fiction",
  //   },
  //   {
  //     id: "id2",
  //     title: "harry potter 2",
  //     content: "fiction",
  //   },
  //   {
  //     id: "id3",
  //     title: "harry potter 3",
  //     content: "fiction",
  //   },
  // ];
  Post.find().then((documents) => {
    //console.log(documents);
    res.status(200).json({
      message: "Posts Fetched Successfully!",
      data: documents,
    });
  });
  //res.send("Hello from Express");
  //next();
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Id not found" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post Deleted!",
    });
  });
});

router.put("", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.body.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post Updated Successfully",
      data: result,
    });
  });
});

module.exports = router;