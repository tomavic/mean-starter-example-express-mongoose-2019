// api-routes.js
// Initialize express router
const router = require("express").Router();
const auth = require("../../middleware/auth");
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const User = require("../models/User.model");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/auth", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.json({
    status: 'success',
    token: token
  });
});

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({
    status: 'fail',
    reason: error.details[0].message
  });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({
    status: 'fail',
    reason: 'User already registered.'
  });

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  // res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));
  res.json({
    status: 'success',
    token: token,
    data: _.pick(user, ["_id", "name", "email"])
  });
});

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

function validateLogin(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }

// Export API routes
module.exports = router;
