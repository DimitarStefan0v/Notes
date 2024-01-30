const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

const { auth } = require('../middlewares/authMiddleware');
const routes = require('../routes');

function expressConfig(app) {
	app.use(express.static(path.resolve(__dirname, '..', 'public')));
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(auth);
	app.use(routes);
}

module.exports = expressConfig;
