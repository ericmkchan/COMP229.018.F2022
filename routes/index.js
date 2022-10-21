const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name: 'Eric Chan', userName: ''});
});

router.get('/aboutme', function(req, res, next) {
  res.render('aboutme', { title: 'About Me', name: 'Eric Chan'});
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects', name: 'Eric Chan'});
});

router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services', name: 'Eric Chan'});
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', name: 'Eric Chan'});
});

module.exports = router;
