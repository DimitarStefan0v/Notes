const express = require('express');

const router = express.Router();

const notesService = require('../services/notesService');

router.get('/create', async (req, res) => {
	const pageTitle = 'Create';
	const path = '/notes/create';

	res.render('create', { pageTitle, path });
});

router.post('/create', async (req, res) => {
	const title = req.body.title;
	const desc = req.body.description;
	const note = { title: title, description: desc };
    notesService.create(note);
	res.redirect('/');
});

router.get('/all', async (req, res) => {
	const pageTitle = 'Notes';
	const path = '/notes/all';
	res.render('notes', { pageTitle, path });
});

module.exports = router;
