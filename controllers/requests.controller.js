 /**
 * @author TOMAS
 * @file requests.controller.js
 */
let Request = require("../models/Request.model");
const jwt = require('jsonwebtoken');
const config = require('config');


// Handle index actions
exports.index = async (req, res) => {
  const token = req.header('x-auth-token');
  const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
  const creatorId = decoded._id; 

  let requests = await Request.find()
                              .populate('creatorId', 'name')
                              .where('creatorId').equals(creatorId)
                              // .select('title')
                              ;
    res.json({
      status: "success",
      message: "Requests retrieved successfully",
      data: requests
    });

};

// Handle view request info
exports.view = function(req, res) {
  Request.findById(req.params.request_id, function(err, request) {
    if (err) res.json({
      message: err.message,
      status: 'fail'
    });
    res.json({
      status: 'success',
      data: request
    });
  });
};


// Handle create request actions
exports.new = function(req, res) {
  // TODO:
  const token = req.header('x-auth-token');
  const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
  const creatorId = decoded._id;

  var request = new Request();
  request.title = req.body.title;
  request.description = req.body.description;
  request.visit_date = req.body.visit_date;
  request.reject_reason = '';
  request.creatorId = creatorId;


  // save the request and check for errors
  request.save(function(err) {
    if (err) res.json({
      message: err.message,
      status: 'fail'
    });
    res.json({
      status: 'success',
      data: request
    });
  });
};


// Handle update request info
exports.update = function(req, res) {
  Request.findById(req.params.request_id, function(err, request) {
    if (err) res.send(err);
    request.title = req.body.title || request.title;
    request.description = req.body.description || request.description;
    request.visit_date = req.body.visit_date || request.visit_date;
    request.reject_reason = request.reject_reason;

    // save the request and check for errors
    request.save(function(err) {
      if (err) res.json({
        message: err.message,
        status: 'fail'
      });
      res.json({
        status: 'success',
        data: request
      });
    });
  });
};



exports.cancel = function(req, res) {
  Request.findById(req.params.request_id, function(err, request) {
    if (err) res.json({
      message: err.message,
      status: 'fail'
    });
    request.status = "cancelled";
    request.reject_reason = req.body.reject_reason;

    // save the request and check for errors
    request.save(function(err) {
      if (err) res.json({
        message: err.message,
        status: 'fail'
      });
      res.json({
        status: 'success',
        data: request
      });
    });
  });
};



// Handle delete request
exports.delete = function(req, res) {
  Request.remove({_id: req.params.request_id}, function(err, request) {
      if (err) res.json({
        message: err.message,
        status: 'fail'
      });
      res.json({
        status: "success",
        message: "Request deleted"
      });
    }
  );
};



// Handle change request info
exports.change = function(req, res) {
  Request.findById(req.params.request_id, function(err, request) {
    if (err) res.json({
      message: err.message,
      status: 'fail'
    });

    request.title = req.body.title || request.title;
    request.description = req.body.description || request.description;
    request.visit_date = req.body.visit_date || request.visit_date;
    request.reject_reason = req.body.reject_reason || request.reject_reason;
    request.status = req.body.status || request.status;

    // save the request and check for errors
    request.save(function(err) {
      if (err) res.json({
        message: err.message,
        status: 'fail'
      });
      res.json({
        status: 'success',
        data: request
      });
    });
  });
};
