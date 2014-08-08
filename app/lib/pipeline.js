'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('express-method-override'); 
var priorities = require('../controllers/priorities');
var tasks = require('../controllers/tasks');

module.exports =function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

/*  app.get('/', home.index);
  app.get('/about', home.about);
  app.get('/faq', home.faq);
  app.get('/contact', home.contact);
*/

  app.get('/priorities/init', priorities.init);
  app.post('/priorities', priorities.create);
  app.get('/priorities', priorities.index);
  app.get('/priorities/:id', priorities.show);

  app.get('/tasks/init', tasks.init);
  app.post('/tasks', tasks.create);
  app.get('/tasks', tasks.index);
  app.get('/tasks/:id', tasks.show);
};

console.log('Pipeline Configured');
