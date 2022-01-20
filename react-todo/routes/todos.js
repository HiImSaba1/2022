const express = require("express");
const router = express.Router();
const ToDo = require("../models/ToDo");
const requiresAuth = require("../middleware/permissions");
const validateToDoInput = require("../validation/toDoValidation");

//@route GET /api/auth/test test todos route
router.get("/test", (req, res) => {
  res.send("Todos route is working");
});

//@route GET /api/auth/current return current users todos
router.get("/current", requiresAuth, async (req, res) => {
  try {
    const completeToDos = await ToDo.find({
      user: req.user._id,
      complete: true,
    }).sort({ completedAt: -1 });

    const inCompleteToDos = await ToDo.find({
      user: req.user._id,
      complete: false,
    }).sort({ createdAt: -1 });
    return res.json({ incomplete: inCompleteToDos, complete: completeToDos });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//@route post /api/auth/test test todos route

router.post("/new", requiresAuth, async (req, res) => {
  try {
    const { isValid, errors } = validateToDoInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //create a new todo
    const newToDo = new ToDo({
      user: req.user._id,
      content: req.body.content,
      complete: false,
    });

    //save to the db new todo
    await newToDo.save();
    return res.json(newToDo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
module.exports = router;
