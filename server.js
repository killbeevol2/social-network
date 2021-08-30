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

const newThought = {
  thoughtText: "textThought",
  username: "username",
};

const newReaction = {
  reactionBody: "reaction",
  username: "username",
};

db.Thought.create(newThought).then((a) => {
  db.Thought.findOneAndUpdate(
    { _id: a._id },
    {
      $set: {
        reactions: newReaction,
      },
    },
    {
      new: true,
    }
  ).then((b) => console.log(b));
});
