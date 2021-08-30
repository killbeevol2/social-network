const mongoose = require("mongoose");
const express = require("express");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/socialnetwork";
const CONFIGS = {
  // useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // debug: true,
};

mongoose.connect(MONGODB_URI, CONFIGS);

const newUser = {
  username: "test",
  email: "test2@test.com",
};
db.User.create(newUser)
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
