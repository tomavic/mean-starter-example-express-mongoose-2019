 /**
 * @author TOMAS
 * @file requests.controller.js
 */
let Request = require("../models/Request.model");


// Handle index actions
exports.index = function(req, res) {
  Request.get(function(err, requests) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Requests retrieved successfully",
      data: requests
    });
  });
};


// Handle create request actions
exports.new = function(req, res) {
  var request = new Request();
  request.title = req.body.title;
  request.description = req.body.description;

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
  Request.findById(req.params.request_id, function(err, request) {
    if (err) res.send(err);
    res.json({
      message: "Request details loading..",
      data: request
    });
  });
};


// Handle update request info
exports.update = function(req, res) {
  Request.findById(req.params.request_id, function(err, request) {
    if (err) res.send(err);
    request.title = req.body.title;
    request.description = req.body.description;

    // save the request and check for errors
    request.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Request Info updated",
        data: request
      });
    });
  });
};


// Handle delete request
exports.delete = function(req, res) {
  Request.remove(
    {
      _id: req.params.request_id
    },
    function(err, request) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Request deleted"
      });
    }
  );
};
