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
  var request = new User();
  request.title = req.body.name ? req.body.name : request.name;
  request.gender = req.body.gender;
  request.email = req.body.email;
  request.phone = req.body.phone;

  // save the request and check for errors
  request.save(function(err) {
    if (err) res.json(err);
    res.json({
      message: "New request created!",
      data: request
    });
  });
};


// Handle view request info
exports.view = function(req, res) {
  User.findById(req.params.contact_id, function(err, request) {
    if (err) res.send(err);
    res.json({
      message: "User details loading..",
      data: request
    });
  });
};


// Handle update request info
// TODO: Admin authority along with Normal User
exports.update = function(req, res) {
  User.findById(req.params.contact_id, function(err, request) {
    if (err) res.send(err);
    request.name = req.body.name ? req.body.name : request.name;
    request.gender = req.body.gender;
    request.email = req.body.email;
    request.phone = req.body.phone;

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
  User.remove(
    {
      _id: req.params.contact_id
    },
    function(err, request) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "User deleted"
      });
    }
  );
};
