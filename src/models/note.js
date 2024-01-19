const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		minLength: [4, 'Title should be between 4 and 30 characters long'],
		maxLength: [30, 'Title should be between 4 and 30 characters long'],
        match: [/^[A-Za-z]+$/, 'Title must contain only letters (A-Z)'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minLength: [5, 'Description should be at least 5 characters long'],
	},
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;