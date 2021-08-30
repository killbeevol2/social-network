const router = require("express").Router();
const db = require("../../models");

router
  .route("/")
  .get((req, res) => {
    db.User.find()
      .then((users) => res.json(users))
      .catch((e) => {
        console.log(e);
        res.json(e);
      });
  })
  .post((req, res) => {
    db.User.create(req.body)
      .then((user) => res.json(user))
      .catch((e) => {
        console.log(e);
        res.json(e);
      });
  });

router.route("/:id").get((req, res) => {
  db.User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((e) => {
      console.log(e);
      res.json(e);
    });
  // async await convention
  // try {
  //   const user = await db.User.findById(req.params.id)
  //     .populate("thoughts")
  //     .populate("friends");
  //   res.json(user);
  // } catch (e) {
  //   res.json(e);
  //   console.log(e);
  // }
});
router
  .route("/:id")
  .put((req, res) => {
    const { username } = req.body;
    db.User.findOneAndUpdate(
      req.params.id,
      {
        username: username,
      },
      {
        new: true,
      }
    ).then((user) => res.json(user));
  })
  .delete((req, res) => {
    db.User.deleteOne({ _id: req.params.id })
      .then(() => res.json("This User has been deleted!"))
      .catch((e) => res.json(e));
  });

router
  .route("/:userId/friends/:friendId")
  .post((req, res) => {
    const { userId, friendId } = req.params;
    db.User.findByIdAndUpdate(
      userId,
      {
        $push: {
          friends: friendId,
        },
      },
      {
        new: true,
      }
    ).then((user) => res.json(user));
  })
  .delete((req, res) => {
    const { userId, friendId } = req.params;
    db.User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          friends: friendId,
        },
      },
      {
        new: true,
      }
    ).then((user) => res.json(user));
  });

module.exports = router;
