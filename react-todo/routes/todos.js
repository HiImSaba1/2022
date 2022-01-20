const express = require("express");
const router = express.Router();
const ToDo = require("../models/ToDo");
const requiresAuth = require("../middleware/permissions");
const validateToDoInput = require("../validation/toDoValidation");

//@route GET /api/todos/test test todos route
router.get("/test", (req, res) => {
  res.send("Todos route is working");
});

//@route GET /api/todos/current return current users todos
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

//@route POST /api/todos/new create a new todo route

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

//@route PUT /api/todos/:toDoId/complete mark todo as a completed task
router.put("/:toDoId/complete", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });
    if (!toDo) {
      return res.status(404).json({ error: "Could not find todo" });
    }
    if (toDo.complete) {
      return res.status(400).json({ error: "Todo is already completed" });
    }
    const updatedToDo = await ToDo.findByIdAndUpdate(
      {
        user: req.user._id,
        _id: req.params.toDoId,
      },
      {
        complete: true,
        completedAt: new Date(),
      },
      {
        new: true,
      }
    );
    return res.json(updatedToDo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//@route PUT /api/todos/:toDoId/incomplete mark todo as a incompleted task
router.put("/:toDoId/incomplete", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });
    if (!toDo) {
      return res.status(404).json({ error: "Could not find todo" });
    }
    if (!toDo.complete) {
      return res.status(400).json({ error: "Todo is already incomplete" });
    }
    const updatedToDo = await ToDo.findByIdAndUpdate(
      {
        user: req.user._id,
        _id: req.params.toDoId,
      },
      {
        complete: false,
        completedAt: null,
      },
      {
        new: true,
      }
    );
    return res.json(updatedToDo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
//@route PUT /api/todos/:toDoId Update a todo
router.put("/:toDoId", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });

    if (!toDo) {
      return res.status(404).json({ error: "Could not find todo" });
    }
    const { isValid, errors } = validateToDoInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const updatedToDo = await ToDo.findByIdAndUpdate(
      {
        user: req.user._id,
        _id: req.params.toDoId,
      },
      {
        content: req.body.content,
      },
      {
        new: true,
      }
    );
    return res.json(updatedToDo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
//@route DELETE /api/todos/:toDoId Delete a todo
router.delete("/:toDoId", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });

    if (!toDo) {
      return res.status(404).json({ error: "Could not find todo" });
    }
    await ToDo.findByIdAndRemove({
      user: req.user._id,
      _id: req.params.toDoId,
    });
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
