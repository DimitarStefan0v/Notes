const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {
	const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Sorry, your username or password was incorrect. Please double-check your username and password.');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        throw new Error('Sorry, your username or password was incorrect. Please double-check your username and password.')
    }

    return user;
};
