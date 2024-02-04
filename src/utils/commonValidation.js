const User = require('../models/User');
const { ERROR_MESSAGES } = require('./errorMessages');

function isRequired(value) {
	if (!value || value.length < 1 || /^[\s]+$/.test(value)) {
		return false;
	}

	return true;
};

async function userDataValidation({ username, email, password, repeatPassword }) {
	const result = {
        errors: [],
        newUserData: { username, email, password, repeatPassword },
    };

    // Checking that there is data and most importantly it is not only whitespaces

	if (isRequired(username) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Username'));
	} else {
        result.newUserData.username = result.newUserData.username.trim();
    }

	if (isRequired(email) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Email'));
	} else {
        result.newUserData.email = result.newUserData.email.trim();
    }

	if (isRequired(password) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Password'));
	} else {
        result.newUserData.password = result.newUserData.password.trim();
    }

    if (isRequired(repeatPassword) === false) {
		result.errors.push(ERROR_MESSAGES.REQUIRED('Repeat Password'));
	} else {
        result.newUserData.repeatPassword = result.newUserData.repeatPassword.trim();
    }

	if (result.errors.length > 0) {
		return result;
	}

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