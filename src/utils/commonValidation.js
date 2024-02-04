const User = require('../models/User');
const { ERROR_MESSAGES } = require('./errorMessages');

function isRequired(value) {
	if (!value || value.length < 1 || /^[\s]+$/.test(value)) {
		return false;
	}

	return true;
};

async function userDataValidation(userData) {
	const result = {
        errors: [],
        newUserData: undefined,
    };

    // Checking that there is data and most importantly it is not only whitespaces

	if (isRequired(userData.username) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Username'));
	}

	if (isRequired(userData.email) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Email'));
	}

	if (isRequired(userData.password) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Password'));
	}

	if (result.errors.length > 0) {
		return result;
	}

	result.newUserData = {
		username: userData.username.trim(),
		email: userData.email.trim(),
		password: userData.password.trim(),
		repeatPassword: userData.repeatPassword.trim(),
	};

    // Checking that there is no user with the same username or email in db

	let user = await User.findOne({ username: result.newUserData.username });

	if (user) {
		result.errors.push(ERROR_MESSAGES.USERNAME_TAKEN);
	}

	user = await User.findOne({ email: result.newUserData.email });

	if (user) {
		result.errors.push(ERROR_MESSAGES.EMAIL_TAKEN);
	}

	return result;
};

const commonValidation = {
    isRequired,
    userDataValidation,
}

module.exports = commonValidation;