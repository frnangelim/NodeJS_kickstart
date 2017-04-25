var db_string = 'mongodb://127.0.0.1/';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'))

db.once('open', function() {

	var userSchema = mongoose.Schema({

		fullName: String,
		email: String,
		birthDate: String,
		cpf: String,
		phoneNumber: String,
		adress: String,
		role: String,
		coach: String,
		students: Array
	});

	exports.User = mongoose.model('User', userSchema);
});