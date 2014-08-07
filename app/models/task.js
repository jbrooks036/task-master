'use strict';

var Mongo = require('mongodb');
var _     = require('lodash');
var moment = require('moment');

Object.defineProperty(Task, 'collection', {
  get: function(){return global.mongodb.collection('tasks');}
});

function Task(o){
  this.name  = o.name;
  this.due = new Date(o.due);

  this.photo = o.photo;
  this.tags = o.tags.split(',');
}

Task.prototype.insert = function(cb){
  Task.collection.insert(this, cb);
};

Task.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Task.collection.findOne({_id:_id}, function(err, obj){
    var task = changePrototype(obj);

    cb(task);
  });
};

Task.all = function(cb){
  Task.collection.find().toArray(function(err,objects){
    var tasks = objects.map(function(o){
      return changePrototype(o);
    });
    cb(tasks);
  });
};
/*
Task.sortByDate = function(cb){
  // should sort tasks by date: soonest to farthest 

  Task.aggregate

  Task.all(function(tasks){
console.log(tasks);
/*
    // sort the array
    var isSorted = false;
    while (!isSorted) {
      for (var i = 0; i < tasks.length; i++) {
        isSorted = true;
        if (Date(tasks[i].due) > Date(tasks[i+1].due)) {
          //swap tasks 
          var t = tasks[i];
          tasks[i] = tasks[i+1];  
          tasks[i+1] = t;
          isSorted = false;
        }
      }
    }

    cb(tasks);
  });
};
*/
module.exports = Task;
// PRIVATE FUNCTIONS ///

function changePrototype(obj){
  var task = _.create(Task.prototype, obj);
  return task;
}
