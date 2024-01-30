const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const jwtPromises = require('../lib/jwt');

const User = require('../models/User');

exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {
	const user = await User.findOne({ username });

	if (!user) {
		throw new Error(
			'Sorry, your username or password was incorrect. Please double-check your username and password.'
		);
	}

	const validPassword = await bcrypt.compare(password, user.password);

	if (!validPassword) {
		throw new Error(
			'Sorry, your username or password was incorrect. Please double-check your username and password.'
		);
	}

	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};

	const token = await jwtPromises.sign(payload, process.env.JWT_SECRET, { expiresIn: '2d' });

	return token;
};
