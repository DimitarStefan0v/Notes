const mongoose = require('mongoose');

const { ERROR_MESSAGES } = require('../utils/errorMessages');

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, ERROR_MESSAGES.REQUIRED('Title')],
		minLength: [4, ERROR_MESSAGES.MIN_LENGTH('Title', 4)],
		maxLength: [30, ERROR_MESSAGES.MAX_LENGTH('Title', 30)],
	},
	description: {
		type: String,
		required: [true, ERROR_MESSAGES.REQUIRED('Description')],
		minLength: [5, ERROR_MESSAGES.MIN_LENGTH('Description', 5)],
	},
	author: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
