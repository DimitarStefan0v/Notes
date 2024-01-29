const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [4, 'Username must be at least 4 '],
        validate: {
            validator: function(value) {
                return !/^\s*$/.test(value);
            },
            message: 'Username cannot be only whitespace'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function(value) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: 'Invalid email address'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters long'],
        validate: {
            validator: function(value) {
                return value === this.repeatPassword;
            },
            message: 'Password and repeat password don\'t match'
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;