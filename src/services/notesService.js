const Note = require('../models/Note');

exports.create = async (noteData) => {
	const note = new Note(noteData);

	await note.save();

	return note;
};

exports.getAll = (userId) => Note.find({ author: userId}).lean();

exports.getById = (noteId) => Note.findById(noteId).lean();

exports.update = (noteId, noteData) =>
	Note.findByIdAndUpdate(noteId, noteData, { runValidators: true });

exports.delete = (noteId) => Note.findByIdAndDelete(noteId);
