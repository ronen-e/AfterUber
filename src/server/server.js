var express = require('express');
var getUberPriceEstimate = require('./uber');
var app = express();	

app.use(express.static('public'));

app.get('/price', function(req, res){	
	var {start, destination } = req.query;
	
	getUberPriceEstimate(start, destination).then((estimate) => {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send(estimate);
	}).catch((err) => {
		//console.log('error', err);
		res.status(400).send({ err });
	});
});

module.exports = app;