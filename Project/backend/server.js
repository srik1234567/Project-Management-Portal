
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));


// User Model
const User = mongoose.model("User", {
  email: String,
  password: String
});


// Task Model
const Task = mongoose.model("Task", {
  userId: String,

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  deadline: String,

  completed: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


// Auth Middleware

function auth(req, res, next) {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("No token");
  }

  try {

    const decoded = jwt.verify(
      token,
      "secret"
    );

    req.userId = decoded.id;

    next();

  } catch {

    return res.status(401)
      .send("Invalid token");

  }

}

// Signup

app.post("/signup", async (req, res) => {

  try {

    const { email, password } =
      req.body;

    if (!email || !password) {
      return res.send(
        "Fill all fields"
      );
    }

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.send(
        "User already exists"
      );
    }

    const hashed =
      await bcrypt.hash(
        password,
        10
      );

    await User.create({
      email,
      password: hashed
    });

    res.send("Signup success");

  } catch (err) {

    console.log(err);
    res.send("Error");

  }

});


// Login

app.post("/login", async (req, res) => {

  try {

    const user =
      await User.findOne({
        email: req.body.email
      });

    if (!user) {
      return res.send(
        "User not found"
      );
    }

    const match =
      await bcrypt.compare(
        req.body.password,
        user.password
      );

    if (!match) {
      return res.send(
        "Wrong password"
      );
    }

    const token = jwt.sign(
      { id: user._id },
      "secret"
    );

    res.json({ token });

  } catch (err) {

    console.log(err);
    res.send("Error");

  }

});


// Add Task

app.post("/addTask", auth, async (req, res) => {

  try {

    const {
      title,
      description,
      deadline
    } = req.body;

    if (
      !title ||
      !description ||
      !deadline
    ) {
      return res.send(
        "Fill all fields"
      );
    }

    if (description.length < 20) {
      return res.send(
        "Description must be at least 20 characters"
      );
    }

    const task =
      await Task.create({

        userId: req.userId,

        title,

        description,

        deadline,

        completed: false

      });

    res.json(task);

  } catch (err) {

    console.log(err);
    res.send("Error");

  }

});


// Get Tasks
app.get("/tasks", auth, async (req, res) => {

  try {

    const tasks =
      await Task.find({
        userId: req.userId
      })
      .sort({
        createdAt: -1
      });

    res.json(tasks);

  } catch (err) {

    console.log(err);
    res.send("Error");

  }

});

// Complete Task
app.put(
  "/complete/:id",
  auth,
  async (req, res) => {

    try {

      await Task.findByIdAndUpdate(
        req.params.id,
        {
          completed: true
        }
      );

      res.send("Completed");

    } catch (err) {

      console.log(err);
      res.send("Error");

    }

  }
);

// Delete Task
app.delete(
  "/delete/:id",
  auth,
  async (req, res) => {

    try {

      await Task.findByIdAndDelete(
        req.params.id
      );

      res.send("Deleted");

    } catch (err) {

      console.log(err);
      res.send("Error");

    }

  }
);


// Server
app.listen(5000, () => {

  console.log(
    "Server running on port 5000 🚀"
  );

});
