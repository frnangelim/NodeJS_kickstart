var db_string = 'mongodb://127.0.0.1/';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

var bcrypt = require('bcrypt-nodejs');

var jwt = require('jsonwebtoken');

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'))

db.once('open', function() {

	var userSchema = mongoose.Schema({

		fullName: {
			type: String,
			required: true
		},
		cpf: {
			type: String,
			required: true,
			unique: true
		},
		age: Number,
		email: String,
		address: String,
		phoneNumber: String
	});

	exports.User = mongoose.model('User', userSchema);
});