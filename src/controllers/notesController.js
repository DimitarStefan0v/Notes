const express = require('express');

const notesService = require('../services/notesService');

const router = express.Router();

router.get('/create', (req, res) => {
	res.render('notes/create', { pageTitle: 'Create Note', path: '/create' });
});

router.post('/create', async (req, res) => {
	const { title, description } = req.body;

	try {
		await notesService.create({ title, description });
	} catch (error) {
		console.log(error.message);
		return res.render('notes/create', { pageTitle: 'Create Note', path: '/create' });
	}

	res.redirect('/notes/all');
});

router.get('/all', async (req, res) => {
	const notes = await notesService.getAll();

	res.render('notes/notes', { pageTitle: 'Notes', path: '/all', notes });
});

router.get('/:noteId/details', async (req, res) => {
	const note = await notesService.getById(req.params.noteId);

	res.render('notes/details', { pageTitle: 'Note Details', path: '', note });
});

router.get('/:noteId/update', async (req, res) => {
	const note = await notesService.getById(req.params.noteId);

	res.render('notes/update', { pageTitle: 'Update Note', path: '', note });
});

router.post('/:noteId/update', async (req, res) => {
	const noteId = req.params.noteId;
	const { title, description } = req.body;
	const note = { title, description };

	try {
		await notesService.update(noteId, note);

		// TODO: db validation is not triggered on update
	} catch (error) {
        console.log(error.message);
		return res.render('notes/update', { pageTitle: 'Update Note', path: '', note });
	}

	res.redirect('/notes/all');
});

router.get('/:noteId/delete', async (req, res) => {
	try {
		await notesService.delete(req.params.noteId);
	} catch (error) {
		console.log(error.message);
		return res.redirect('/');
	}

	res.redirect('/notes/all');
});

module.exports = router;
