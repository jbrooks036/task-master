'use strict';

var Priority = require('../models/priority');

exports.init = function(req, res){
  res.render('priorities/init');
};

exports.create = function(req, res){
  var priority = new Priority(req.body);
  priority.insert(function(){
    res.redirect('/priorities');
  });
};

exports.index = function(req, res){
  Priority.all(function(priorities){
    res.render('priorities/index', {priorities:priorities});
  });
};

exports.show = function(req, res){
  Priority.findById(req.params.id, function(priority){
    res.render('priorities/show', {priority:priority});
  });
};
