const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		minLength: [4, 'Username must be at least 4 characters long'],
		validate: {
			validator: function (value) {
				return !/^\s*$/.test(value);
			},
			message: 'Username cannot be only whitespace',
		},
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		validate: {
			validator: function (value) {
				return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					value
				);
			},
			message: 'Invalid email address',
		},
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minLength: [6, 'Password must be at least 6 characters long'],
	},
});

// TODO: validate that there is no user with the same username in db

userSchema.virtual('repeatPassword').set(function (value) {
	if (value !== this.password) {
		throw new mongoose.MongooseError(
			"Password and repeat password don't match"
		);
	}
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
