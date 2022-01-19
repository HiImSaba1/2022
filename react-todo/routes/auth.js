const express = require("express");
const bcrypt = require("bcryptjs"); //password hash
const router = express.Router();
const User = require("../models/User");
const validateRegisterInput = require("../validation/registerValidation");

//@route GET /api/auth/test

router.get("/test", (req, res) => {
  res.send("Auth working?");
});

//@route POST /api/auth/register

router.post("/register", async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //check for existing user
    const existingEmail = await User.findOne({
      // check for case sensitive emails Test@test.com == test@test.com
      email: new RegExp("^" + req.body.email + "$", "i"),
    });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "There is already user with this email" });
    }
    //hash password
    const hashed = await bcrypt.hash(req.body.password, 12);
    //create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
    });
    //save new user
    const savedUser = await newUser.save();
    return res.json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
module.exports = router;
