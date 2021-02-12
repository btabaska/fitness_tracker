const router = require("express").Router();
const Workout = require("../models/Workout.js");
const path = require("path");

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "exercise.html"));
});

module.exports = router;
