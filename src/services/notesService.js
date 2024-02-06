const Note = require('../models/Note');

exports.create = (noteData) => Note.create(noteData);

exports.getAll = (userId, page, itemsPerPage) =>
	Note.find({ author: userId })
		.skip((page - 1) * itemsPerPage)
		.limit(itemsPerPage)
		.lean();

exports.getById = (noteId) => Note.findById(noteId).lean();

exports.update = (noteId, noteData) =>
	Note.findByIdAndUpdate(noteId, noteData, { runValidators: true });

exports.delete = (noteId) => Note.findByIdAndDelete(noteId);

exports.getAuthor = (noteId) => Note.findById(noteId).select('author').lean();
