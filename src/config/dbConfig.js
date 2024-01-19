const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/notesDb';

async function dbConnect() {
	await mongoose.connect(uri);
}

module.exports = dbConnect;
