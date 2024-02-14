const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lx44xiq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

async function dbConnect() {
	await mongoose.connect(uri);
}

module.exports = dbConnect;
