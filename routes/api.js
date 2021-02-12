const router = require("express").Router();
const Workout = require("../models/Workout.js");
const path = require("path");

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .sort({ date: 1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
router.get("/api/workouts/range:id", (req, res) => {
  Workout.findById(req.body.id)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
router.post("/api/workouts", (req, res) => {
  Workout.create(req.body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true },
    (err, todo) => {
      if (err) return res.status(500).send(err);
      return res.send(todo);
    }
  );
});

router.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "exercise.html"));
});

router.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "stats.html"));
});

module.exports = router;
