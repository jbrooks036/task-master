/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Task = require('../../app/models/task');
var Priority = require('../../app/models/priority');
var connection = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

var p1, p2, p3;
var po1 = {name:'low', color:'green', value:'1'};
var po2 = {name:'med', color:'yellow', value:'5'};
var po3 = {name:'high', color:'red', value:'10'};
    
var t1, t2, t3;

describe('Task', function(){

  before(function(done){
    connection('taskmaster-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Task.collection.remove(function(){
      Priority.collection.remove(function(){
        p1 = new Priority(po1);
        p2 = new Priority(po2);
        p3 = new Priority(po3);
        p1.insert(function(){
          p2.insert(function(){
            p3.insert(function(){
              var to1 = {name:'get milk',due:'8/8/2014', photo:'http://www.dailyslave.com/wp-content/uploads/2014/04/milk.jpg', tags:'home,food,errands', priorityID:p1._id.toString()};
              var to2 = {name:'get bread',due:'8/10/2014', photo:'http://www.dailyslave.com/wp-content/uploads/2014/04/milk.jpg', tags:'home,food,errands', priorityID:p2._id.toString()};
              var to3 = {name:'get gas',due:'8/7/2014', photo:'http://www.dailyslave.com/wp-content/uploads/2014/04/milk.jpg', tags:'home,errands', priorityID:p3._id.toString()};
               t1= new Task(to1);
               t2= new Task(to2);
               t3= new Task(to3);
                t1.insert(function(){
                  t2.insert(function(){
                    t3.insert(function(){
                      done();
                      });
                    });
                  });
                });
              });
             });
           });
         });
       });

  describe('constructor', function(){
    it('should create a new Task object', function(){
      expect(t1).to.be.instanceof(Task);
      expect(t1.name).to.equal('get milk');
      expect(t1.due).to.be.instanceof(Date);
      expect(t1.tags).to.have.length(3);
      expect(t1.tags[0]).to.equal('home');
    });
  });

  describe('#insert', function(){
    it('should insert a new Task object into mongodb', function(done){
      var to1 = {name:'get milk',due:'8-8-2014', photo:'http://www.dailyslave.com/wp-content/uploads/2014/04/milk.jpg', tags:'home,food,errands'};
      var t1 = new Task(to1);
      t1.insert(function(){
        expect(t1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a task by its id', function(done){
      Priority.findById(t1._id.toString(), function(priority){
        expect(t1).to.be.instanceof(Task);
        expect(t1.name).to.equal('get milk');
        done();
      });
    });
  });

describe('.all', function(){
    it('should get all students from database', function(done){
      Task.all(function(tasks){
        expect(tasks).to.have.length(3);
        expect(t2.name).to.equal('get bread');
        done();
      });
    });
  });

/*describe('.sortByDate', function(){
  it('should sort tasks by date: soonest to farthest', function(done){
    Task.sortByDate(function(tasks){
    expect(tasks).to.have.length(3);
    expect(tasks[0].name).to.equal('get gas');
          done();
        });
      });
    });*/
});
