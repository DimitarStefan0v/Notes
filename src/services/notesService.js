const Note = require('../models/Note');

exports.create = (noteData) => Note.create(noteData);

exports.getAll = (userId) => Note.find({ author: userId}).lean();

exports.getById = (noteId) => Note.findById(noteId).lean();

exports.update = (noteId, noteData) =>
	Note.findByIdAndUpdate(noteId, noteData, { runValidators: true });

exports.delete = (noteId) => Note.findByIdAndDelete(noteId);
