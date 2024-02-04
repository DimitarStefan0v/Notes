const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { ERROR_MESSAGES } = require('../utils/errorMessages');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
        unique: true,
		required: [true, ERROR_MESSAGES.REQUIRED('Username')],
		minLength: [5, ERROR_MESSAGES.MIN_LENGTH('Username', 5)],
        maxLength: [20, ERROR_MESSAGES.MAX_LENGTH('Username', 20)],
        match: [/^[A-Za-z0-9]+$/, ERROR_MESSAGES.USERNAME_REGEX],
	},
	email: {
		type: String,
		required: [true, ERROR_MESSAGES.REQUIRED('Email')],
		validate: {
			validator: function (value) {
				return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					value
				);
			},
			message: ERROR_MESSAGES.EMAIL_REGEX,
		},
	},
	password: {
		type: String,
		required: [true, ERROR_MESSAGES.REQUIRED('Password')],
		minLength: [6, ERROR_MESSAGES.MIN_LENGTH('Password', 6)],
	},
});

userSchema.virtual('repeatPassword').set(function (value) {
	if (value !== this.password) {
		throw new mongoose.MongooseError(
			ERROR_MESSAGES.REPEAT_PASSWORD
		);
	}
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
