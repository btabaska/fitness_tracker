const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  exercises: {
    type: {
      type: String,
      enum: ["resistance", "cardio"],
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      min: [0, "Duration too Low"],
    },
    weight: {
      type: Number,
      min: [0, "Weight too Low"],
    },
    reps: {
      type: Number,
      min: [0, "Reps too Low"],
    },
    sets: {
      type: Number,
      min: [0, "Sets too Low"],
    },
    distance: {
      type: Number,
      min: [0, "Duration too Low"],
    },
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
