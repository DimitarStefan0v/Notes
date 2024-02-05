const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwtPromises = require('../lib/jwt');
const { ERROR_MESSAGES } = require('../utils/errorMessages');
const { isUsernameAvailable, isEmailAvailable } = require('../utils/commonValidation');

exports.register = async ({ username, email, password, repeatPassword }) => {
    const isNameAvailable = await isUsernameAvailable(username);
    if (!isNameAvailable) {
        throw Error(ERROR_MESSAGES.USERNAME_TAKEN);
    }

    const isMailAvailable = await isEmailAvailable(email);
    if (!isMailAvailable) {
        throw Error(ERROR_MESSAGES.EMAIL_TAKEN);
    }

	return User.create({ username, email, password, repeatPassword });
};

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
