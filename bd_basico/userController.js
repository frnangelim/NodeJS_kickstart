var db = require('./db_config.js');

exports.login = function(login, password, callback){

	db.User.findOne({login : login}, function(error, user){
		if(error){
			callback({error: 'Deu erro'});
		}else{
			if(user.validatePassword(password)){
				callback('Usuário logado com sucesso.')
			}else{
				callback('Login ou senha inválido.');
			}
		}
	});
};

exports.list = function(callback){

	db.User.find({}, function(error, users){

		if(error){
			callback({error:'Não foi possível retornar os usuários'});
		}else{
			callback(users)
		}
	});
};

exports.listOne = function(cpf, callback){

	db.User.findOne({cpf : cpf}, function(error, user){

		if(error){
			callback({error:'Não foi possível retornar os usuários'});
		}else{
			callback(user)
		}
	});

};

exports.save = function(fullName, cpf, login, password, callback){


	var user = new db.User({
		'fullName': fullName,
		'cpf': cpf,
		'login': login
	});
	user.password = user.generatePassword(password)

	user.save(function(error, user){
		if(error){
			callback({error:'Não foi possível criar o usuário'});
		}else{
			callback(user);
		}
	});
};

exports.update = function(currentcpf, fullName, age, email, address, newCpf, phoneNumber, callback){

	db.User.findOne({cpf : currentcpf}, function(error, user){
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

		user.save(function(error,user){
			if(error){
				callback({error: 'Não foi possivel salvar o usuário'});
			}else{
				callback(user);
			}
		});
	});
};

exports.delete = function(cpf, callback){

	db.User.findOne({cpf : cpf}, function(error, user){
		if(error){
			res.json({error:'Não foi possivel apagar o usuário'});
		}else{
			user.remove(function(error){
				if(!error){
					callback({error:'O usuário foi excluído com sucesso.'});
				}
			});
		}
	});
};