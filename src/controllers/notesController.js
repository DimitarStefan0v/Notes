const express = require('express');

const router = express.Router();

const notesService = require('../services/notesService');

router.get('/create', (req, res) => {
	const pageTitle = 'Create';
	const path = '/notes/create';

	res.render('notes/create', { pageTitle, path });
});

router.post('/create', async (req, res) => {
	const { title, description } = req.body;
	const pageTitle = 'Create';
	const path = '/notes/create';

	try {
		await notesService.create({ title, description });
	} catch (error) {
		console.log(error.message);
		return res.render('notes/create', { pageTitle, path });
	}

	res.redirect('/notes/all');
});

router.get('/all', async (req, res) => {
	const pageTitle = 'Notes';
	const path = '/notes/all';
	const notes = await notesService.getAll();

	res.render('notes/notes', { pageTitle, path, notes });
});

router.get('/:noteId/details', async (req, res) => {
	const pageTitle = 'Note Details';
	const path = '/notes/all';
    const note = await notesService.getById(req.params.noteId);
    
	res.render('notes/details', { pageTitle, path, note });
});

module.exports = router;
