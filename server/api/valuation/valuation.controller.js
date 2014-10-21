'use strict';

var _ = require('lodash');
var Valuation = require('./valuation.model');

// Get list of valuations
exports.index = function(req, res) {
  Valuation.find(function (err, valuations) {
    if(err) { return handleError(res, err); }
    return res.json(200, valuations);
  });
};

// Get a single valuation
exports.show = function(req, res) {
  Valuation.findById(req.params.id, function (err, valuation) {
    if(err) { return handleError(res, err); }
    if(!valuation) { return res.send(404); }
    return res.json(valuation);
  });
};

// Creates a new valuation in the DB.
exports.create = function(req, res) {
  Valuation.create(req.body, function(err, valuation) {
    if(err) { return handleError(res, err); }
    return res.json(201, valuation);
  });
};

// Updates an existing valuation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Valuation.findById(req.params.id, function (err, valuation) {
    if (err) { return handleError(res, err); }
    if(!valuation) { return res.send(404); }
    var updated = _.merge(valuation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, valuation);
    });
  });
};

// Deletes a valuation from the DB.
exports.destroy = function(req, res) {
  Valuation.findById(req.params.id, function (err, valuation) {
    if(err) { return handleError(res, err); }
    if(!valuation) { return res.send(404); }
    valuation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}