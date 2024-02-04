const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwtPromises = require('../lib/jwt');
const { isRequired } = require('../utils/commonValidation');
const { ERROR_MESSAGES } = require('../utils/errorMessages');

exports.register = async ({ username, email, password, repeatPassword }) => {
    const errors = [];

    if (isRequired(username) === false) {
        errors.push(ERROR_MESSAGES.REQUIRED('Username'));
    }

    if (isRequired(email) === false) {
        errors.push(ERROR_MESSAGES.REQUIRED('Email'));
    }

    if (isRequired(password) === false) {
        errors.push(ERROR_MESSAGES.REQUIRED('Password'));
    }

    if (errors.length > 0) {
        throw errors;
    }

    username = username.trim();
    email = email.trim();
    password = password.trim();
    repeatPassword = repeatPassword.trim();

	let user = await User.findOne({ username: username });

	if (user) {
		errors.push(ERROR_MESSAGES.USERNAME_TAKEN);
	}

	user = await User.findOne({ email: email });

	if (user) {
		errors.push(ERROR_MESSAGES.EMAIL_TAKEN);
	}

    if (errors.length > 0) {
        throw errors;
    }

	return User.create({ username, email, password, repeatPassword });
};

exports.login = async (username, password) => {
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
