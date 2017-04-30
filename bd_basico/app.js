var app = require('./app_config.js');

var db = require('./db_config.js');

var validator = require('validator');

app.get('/', function(req, res) {

	res.end('Bem-vindo ao nosso workshop!');
});

app.get('/users', function(req,res){

	db.User.find({}, function(error, users){

		if(error){
			res.json('Não foi possível retornar os usuários');
		}else{
			res.json(users)
		}
	});

});

app.post('/users', function(req,res){

	var fullName = validator.trim(validator.escape(req.body.fullName));
	var cpf = validator.trim(validator.escape(req.body.cpf));

	new db.User({
		'fullName': fullName,
		'cpf': cpf
	}).save(function(error, user){
		if(error){
			res.json('Não foi possível criar o usuário');
		}else{
			res.json(user);
		}
	});

});

app.put('/users/:cpf', function(req,res){

	var currentCpf = validator.trim(validator.escape(req.param(cpf)));

	var fullName = validator.trim(validator.escape(req.body.fullName));
	var age = validator.trim(validator.escape(req.body.age));
	var email = validator.trim(validator.escape(req.body.email));
	var address = validator.trim(validator.escape(req.body.address));
	var newCpf = validator.trim(validator.escape(req.body.cpf));
	var phoneNumber = validator.trim(validator.escape(req.body.phoneNumber));

	db.User.findOne({cpf : currentCpf}, function(error, user){
		if(fullName){
			user.fullName = fullName
		}
		if(age){
			user.age = age;
		}
		if(email){
			user.email;
		}
		if(address){
			user.address = address;
		}
		if(newCpf){
			user.cpf = newCpf;
		}
		if(phoneNumber){
			user.phoneNumber = phoneNumber;
		}
	});

});

app.delete('/users', function(req,res){

	var cpf = validator.trim(validator.escape(req.body.cpf));

	db.User.findOne({cpf : cpf}, function(error, user){
		if(error){
			res.json('Não foi possivel apagar o usuário');
		}else{
			user.remove(function(error){
				if(!error){
					res.json('O usuário foi excluído com sucesso.');
				}
			});
		}
	});
});


app.post('/coach', function(req,res) {

	var fullName = validator.trim(validator.escape(req.param('fullName')));
	
	var coach = new db.Coach({
		'fullName' : fullName,
	})

	coach.token = coach.generateToken(fullName);

	coach.save(function(error, coach){
		if(error){
			res.json(error);
		}else{
			res.json(coach)
		}
	});

});