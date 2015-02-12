module.exports = function (io) {
	// ...
	var express = require('express');
	var router = express.Router();
	var bodyParser = require('body-parser');
	// could use one line instead: var router = require('express').Router();

	var tweetBank = require('../tweetBank');

	// parse application/x-www-form-urlencoded
	var jsonParser = bodyParser.json();

	// create application/x-www-form-urlencoded parser
	var urlencodedParser = bodyParser.urlencoded({ extended: false });

	router.post('/submit', urlencodedParser, function(req, res, next){
		if (!req.body) return res.sendStatus(400);
		next();
	});

	router.post('/submit', function(req, res) {
		var name = req.body.name;
		var text = req.body.text;
		tweetBank.add(name, text);
		res.redirect('/');
	});

	router.get('/', function (req, res) {
		var tweets = tweetBank.list();
		res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
	});

	router.get('/users/:name', function(req, res) {
		var name = req.params.name,
		list = tweetBank.find( {name: name} );
		res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: list, name: name, showForm: true } );
	});

	router.get('/users/:name/tweets/:id', function(req, res) {
		var name = req.params.name,
		id = req.params.id,
		list = tweetBank.find({name: name, id: parseInt(id)});
		res.render( 'index', { title: 'Twitter.js - Single post by ' + name, tweets: list, name: name, showForm: true } );
	});

	router.get('/*', function(req, res){
		res.send('Not a path');
	});

	  // ...
  	return router;
};