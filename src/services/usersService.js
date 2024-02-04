const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwtPromises = require('../lib/jwt');
const { ERROR_MESSAGES } = require('../utils/errorMessages');

exports.register = ({ username, email, password, repeatPassword }) =>
	User.create({ username, email, password, repeatPassword });

exports.login = async ({ username, password }) => {
	const user = await User.findOne({ username });

	if (!user) {
		throw Error(ERROR_MESSAGES.INVALID_LOGIN);
	}

	const validPassword = await bcrypt.compare(password, user.password);

	if (!validPassword) {
		throw Error(ERROR_MESSAGES.INVALID_LOGIN);
	}

	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};
    
	const token = await jwtPromises.sign(payload, process.env.JWT_SECRET, {
		expiresIn: '2d',
	});

	return token;
};
