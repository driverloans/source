/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Valuation = require('./valuation.model');

exports.register = function(socket) {
  Valuation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Valuation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('valuation:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('valuation:remove', doc);
}