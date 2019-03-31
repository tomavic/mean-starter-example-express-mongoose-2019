 /**
 * @author TOMAS
 * @file users.controller.js
 */
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const User = require("../models/User.model");


exports.me = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json({
    status: 'success',
    user: user
  });
}

exports.login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({
    status: 'fail',
    reason: error.details[0].message
  });

  let user = await User.findOne({ email: req.body.email });
  let _user = await User.findOne({ email: req.body.email }).select("-password");
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.json({
    status: 'success',
    token: token,
    user: _user
  });
}

exports.register = async (req, res) => {
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

  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  // res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));
  res.json({
    status: 'success',
    token: token,
    data: _.pick(user, ["_id", "name", "email", "isAdmin", "create_date"])
  });
}

exports.list = async(req, res) => {
  const users = await User.find().sort('name').select("-password");;
  res.json({
    status: 'success',
    users: users
  });
}

exports.update = async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).json({
    status: 'fail',
    reason: error.details[0].message
  });

  const user = await User.findByIdAndUpdate(req.params.user_id, { 
    name: req.body.name,
    // email: req.body.email,
  }, { new: false });

  if (!user) return res.status(404).json('The user with the given ID was not found.');

  res.json({
    message: "User Info updated",
    data: user
  });

}

exports.delete = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.user_id);
  if (!user) return res.status(404).send('The user with the given ID was not found.');
  res.json({
    status: "success",
    message: "User deleted"
  });
}


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
      .required(),
    isAdmin: Joi.number()
      .required()
  };
  return Joi.validate(user, schema);
}

function validateLogin(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(user, schema);
}

function validate(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    // email: Joi.string()
    //   .min(5)
    //   .max(255)
    //   .required()
    //   .email()
  };
  return Joi.validate(user, schema);
}
