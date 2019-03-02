const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
//Get User model
const User = require("../../models/User");
const keys = require("../../config/keys");
//@route    api/users/test
//@desc     Tests the users route
//@access    Public
router.get("/test", (req, res) => res.json({ message: "user works" }));
//@route    api/users/register
//@desc     Register a new user
//@access    Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return res.status(400).json({ error: err });
    if (foundUser)
      return res.status(400).json({ email: "Email already exists" });

    const { name, email, password, avatar } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      User.create(
        {
          name,
          email,
          password: hash,
          avatar
        },
        (err, newUser) => {
          if (err) console.log(err);
          else res.json(newUser);
        }
      );
    });
  });
});

//@route    api/users/login
//@desc     Login User/ Return JWToken
//@access    Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //  finding user by email
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }; // Create jwt payload.
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "incorrect password";
        return res.json(errors);
      }
    });
  });
});
//@route    api/users/current
//@desc     return
//@access    Public
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);
module.exports = router;
