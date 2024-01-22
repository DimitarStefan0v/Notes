const path = require('path');

const express = require('express');

const routes = require('../routes');

function expressConfig(app) {
	app.use(express.static(path.resolve(__dirname, '..', 'public')));
	app.use(express.urlencoded({ extended: false }));
	app.use(routes);
}

module.exports = expressConfig;