const User = require('../models/User');
const { ERROR_MESSAGES } = require('./errorMessages');

function isRequired(value) {
	if (!value || value.length < 1 || /^[\s]+$/.test(value)) {
		return false;
	}

	return true;
};

async function registerValidation({ username, email, password, repeatPassword }) {
	const result = {
        errors: [],
        trimmedUserData: { username, email, password, repeatPassword },
    };

    // Checking that there is data and most importantly it is not only whitespaces

	if (isRequired(username) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Username'));
	} else {
        result.trimmedUserData.username = result.trimmedUserData.username.trim();
    }

	if (isRequired(email) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Email'));
	} else {
        result.trimmedUserData.email = result.trimmedUserData.email.trim();
    }

	if (isRequired(password) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Password'));
	} else {
        result.trimmedUserData.password = result.trimmedUserData.password.trim();
    }

    if (isRequired(repeatPassword) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Repeat Password'));
	} else {
        result.trimmedUserData.repeatPassword = result.trimmedUserData.repeatPassword.trim();
    }

	if (result.errors.length > 0) {
		return result;
	}

    // Checking that there is no user with the same username or email in db

	let user = await User.findOne({ username: result.trimmedUserData.username });

	if (user) {
		result.errors.push(ERROR_MESSAGES.USERNAME_TAKEN);
	}

	user = await User.findOne({ email: result.trimmedUserData.email });

	if (user) {
		result.errors.push(ERROR_MESSAGES.EMAIL_TAKEN);
	}

	return result;
};

function loginValidation ({ username, password}) {
    const result = {
        errors: [],
        trimmedUserData: { username, password },
    };

	if (isRequired(username) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Username'));
	} else {
        result.trimmedUserData.username = result.trimmedUserData.username.trim();
    }

    if (isRequired(password) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Password'));
	} else {
        result.trimmedUserData.password = result.trimmedUserData.password.trim();
    }

    return result;
}

const commonValidation = {
    isRequired,
    registerValidation,
    loginValidation,
};

module.exports = commonValidation;