'use strict';

var Task = require('../models/task');

exports.init = function(req, res){
  res.render('tasks/init');
};

exports.create = function(req, res){
  var task = new Task(req.body);
  task.insert(function(){
    res.redirect('/tasks');
  });
};

exports.index = function(req, res){
  Task.all(function(tasks){
    res.render('tasks/index', {tasks:tasks});
  });
};

exports.show = function(req, res){
  Task.findById(req.params.id, function(task){
    res.render('tasks/show', {task:task});
  });
};
