/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var p1;

describe ('Priority', function() {
  before(function(done){
    dbConnect('priority-test', function(){
      var o = {name:'high', color:'red', value:'10'};
      p1 = new Priority(o);
      p1.insert(function(){
        done();
      });
    });
  });

  beforeEach(function(done){
    Priority.collection.remove(function(){
      var o = {name:'high', color:'red', value:'10'};
      var p1 = new Priority(o);
      p1.insert(function(){
        done();
      });
    });
  });

  describe('constructor', function(){
      var p2 = new Priority({name:'med', color:'yellow', value:5});
      it('should create a new Priority object', function(){
        expect(p2).to.be.instanceof(Priority);
        expect(p2.name).to.equal('med');
        expect(p2.color).to.equal('yellow');
        expect(p2.value).to.equal(5);
        expect(p2.color).to.equal('yellow');
      });
    });

  describe('#insert', function(){
    it('should insert a priority', function(done){
      var o = {name:'low', color:'green', value:'1'};
      var p3 = new Priority(o);
      p3.insert(function(){
        expect(p3._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });


  describe('.all', function(){
    it('should get all ojects from database', function(done){
      Priority.all(function(priorities){
        expect(priorities).to.have.length(1);
        expect(priorities[0]).to.be.instanceof(Priority);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a priority by its id', function(done){
      Priority.findById(p1._id.toString(), function(priority){
        expect(p1.name).to.equal('high');
        expect(p1).to.be.instanceof(Priority);
        done();
      });
    });
  });
});



