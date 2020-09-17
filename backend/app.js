const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const routes = require("./routes/posts");

//Connect to MongoDB Database
mongoose
  .connect(
    "Paste you MongoDB Connection String Here",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch(() => {
    console.log("Connection Failed!");
  });

//Mongoose Model
const Post = require("./models/post");
//const Product = require("./models/post");

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  //console.log("First Middleware");
  //add CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", routes);

module.exports = app;