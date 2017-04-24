var app = require('./app_config.js');

var userController = require('./userController.js');

var validator = require('validator');

app.get('/', function(req, res) {

	res.end('Bem-vindo ao nosso workshop!');
});