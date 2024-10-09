// controllers/usersController.js
import Users from '../models/usersModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import db from '../config/db.js'; // Import the Knex instance
import qs from 'querystring';	

const generarToken = (id, name, email, user_types_id) => {
    return jwt.sign({ id,name, email, user_types_id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const usersController = {
getAllUsers: async (req, res) => {
	try {
		const users = await Users.getAllUsers();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
},

getUserById: async (req, res) => {
	try {
		const user = await Users.getUserById(req.params.id);
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
},

createUser: async (req, res) => {
	try {
		const { name, lastname, birthdate, phone, email, user_types_id } = req.body;
		const defaultPassword = '1234';
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(defaultPassword, salt);
		let password = hashedPassword;
		let newUserData = { name, lastname, birthdate, phone, email, user_types_id, password };
		console.log(req.body);
		console.log(newUserData);
		const newUser = await Users.createUser(newUserData);
		res.status(201).json(newUserData);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
},

registerUser: async (req, res) => {
	
	try {
		const { name, lastname, birthdate, phone, email, user_types_id } = req.body;
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(req.body.password, salt)
		let password = hashedPassword;
		let newUserData = { name, lastname, birthdate, phone, email, user_types_id, password };
		//const newUser = await Users.createUser(newUserData);
		res.status(201).json(newUserData);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
},

updateUser: async (req, res) => {
	try {
		const { name, lastname, birthdate, phone, email, user_types_id } = req.body;
		const actual_date = new Date();
		const updated_at = actual_date.toISOString();
		let newUserData = { name, lastname, birthdate, phone, email, user_types_id, updated_at };
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(req.body.password, salt)
			let password = hashedPassword;
			newUserData = { ...newUserData, password };
		}
		
		const updatedUser = await Users.updateUser(req.params.id, newUserData);
	if (updatedUser) {
		res.json(updatedUser);
	} else {
		res.status(404).json({ message: 'User not found' });
	}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
},

deleteUser: async (req, res) => {
	try {
		const deletedUser = await Users.deleteUser(req.params.id);
		if (deletedUser) {
			res.json({ message: 'User deleted successfully' });
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
},

loginUser: asyncHandler(async (req, res) => {
	//var json2 = qs.parse(req.body);
	console.log('login requested by: ' + JSON.stringify(req.body) );
	const {email, password} = req.body;
    const user = await Users.getUserByEmail(email);


    //si existe el usuario verificamos el hash del password
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id, user.name, user.email, user.user_types_id)  //generamos el token
        })
    } else {
        res.status(400) //bad request
        throw new Error('Credenciales incorrectas')
    }
}),

testUser: async (req, res) => {
	
	console.log(req.body.email);
	const {email, password} = req.body;
	try {
		//const user = await Users.getUserByEmail({email});
		const user = await db('users').where({ email }).first();
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
},

testPass: async (req, res) => {
	// $2a$10$/BYOeOQUpGqN/H2oPl.JqekN4OYpWvynn1/2KRkf59k3.UcMTxClm = 1234
	console.log(req.body);
	try {

		if (await bcrypt.compare(req.body.password, '$2a$10$/BYOeOQUpGqN/H2oPl.JqekN4OYpWvynn1/2KRkf59k3.UcMTxClm')) {
			res.json({ message: 'Test successful: pass is ok.' });
		}
		else{
			res.json({ message: 'Test failed: pass is WRONG.' });
		}
		
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
},

};


export default usersController;
