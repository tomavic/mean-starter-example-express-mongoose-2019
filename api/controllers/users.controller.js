 /**
 * @author TOMAS
 * @file users.controller.js
 */
let User = require("../models/User.model");


// Handle index actions
// TODO: Admin authority
exports.list = function(req, res) {
  User.get(function(err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Users retrieved successfully",
      data: users
    });
  });
};


// Handle create request actions
exports.signup = function(req, res) {
  var user = new User();
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.email = req.body.email;
  user.mobile = req.body.mobile;
  user.password = req.body.password;

  // save the user and check for errors
  user.save(function(err) {
    if (err) res.json(err);
    res.json({
      message: "New user created!",
      data: user
    });
  });
};


// Handle view user info
exports.view = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) res.send(err);
    res.json({
      status: "success",
      data: user
    });
  });
};


// Handle update request info
// TODO: Admin authority along with Normal User
exports.update = function(req, res) {
  User.findById(req.params.contact_id, function(err, request) {
    if (err) res.send(err);
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.mobile = req.body.mobile;
    user.password = req.body.password;

    // save the request and check for errors
    request.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "User Info updated",
        data: request
      });
    });
  });
};


// Handle delete request
// TODO: Admin authority
exports.delete = function(req, res) {
  User.remove({_id: req.params.user_id}, function(err, request) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "User deleted"
      });
    }
  );
};
