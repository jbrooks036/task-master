'use strict';

var Priority = require('../models/priority');

exports.init = function(req, res){
  res.render('priority/init');
};

exports.create = function(req, res){
  var priority = new Priority(req.body);
  priority.insert(function(){
    res.redirect('/priorities/index');
  });
};

exports.index = function(req, res){
  Priority.all(function(priority){
    res.render('priorities/index', {priority:priority});
  });
};

exports.show = function(req, res){
  Priority.findById(req.params.id, function(priority){
    res.render('priorities/show', {priority:priority});
  });
};
