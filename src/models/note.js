const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
	title: {
		type: String,
		required: true,
		minLength: 4,
		maxLength: 30,
	},
	description: {
		type: String,
		required: true,
		minLength: 5,
	},
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;