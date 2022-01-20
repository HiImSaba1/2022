const express = require("express");
const bcrypt = require("bcryptjs"); //password hash
const router = express.Router();
const User = require("../models/User");
const validateRegisterInput = require("../validation/registerValidation");
const jwt = require("jsonwebtoken");
const requiresAuth = require("../middleware/permissions");

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

    const userToReturn = { ...savedUser._doc };
    delete userToReturn.password;
    //return the new user
    return res.json(userToReturn);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
//@route POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    //check for the user
    const user = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "There was a problem with your login credentials" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: "There was a problem with your login credentials" });
    }
    const payload = { userId: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("access-token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const userToReturn = { ...user._doc };
    delete userToReturn.password;

    return res.json({
      token: token,
      user: userToReturn,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

//@route POST /api/auth/current currently authed user
router.get("/current", requiresAuth, (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthoriszed");
  }
  return res.json(req.user);
});

module.exports = router;
