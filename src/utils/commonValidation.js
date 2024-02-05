const User = require('../models/User');

exports.isRequired = (value) => {
	if (!value || value.length < 1 || /^[\s]+$/.test(value)) {
		return false;
	}

	return true;
};

exports.isUsernameAvailable = async (username) => {
	const user = await User.findOne({ username: username }).lean();

	if (user) {
		return false;
	}

    return true;
};

exports.isEmailAvailable = async (email) => {
    const user = await User.findOne({ email: email }).lean();

    if (user) {
        return false;
    }

    return true;
};