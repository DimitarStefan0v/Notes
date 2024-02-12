const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const compression = require('compression');

const { auth } = require('../middlewares/authMiddleware');

function expressConfig(app) {
	app.use(express.static(path.resolve(__dirname, '..', 'public')));
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
    app.use(helmet());
    app.use(compression());
	app.use(auth);
}

module.exports = expressConfig;
