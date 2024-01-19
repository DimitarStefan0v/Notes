const Note = require('../models/note');

exports.create = async (noteData) => {
    const note = new Note(noteData);

    await note.save();

    return note;
};

exports.getAll = async () => await Note.find().lean();