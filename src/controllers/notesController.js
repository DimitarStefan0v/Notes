const express = require('express');

const { isAuth } = require('../middlewares/authMiddleware');
const notesService = require('../services/notesService');
const { extractErrorMessages } = require('../utils/errorHelpers');

const router = express.Router();

router.get('/all', async (req, res) => {
	const user = req.user;
	let notes;

	if (!user) {
		notes = {};
	} else {
		notes = await notesService.getAll(user._id);
	}

	res.render('notes/notes', { pageTitle: 'Notes', path: '/all', notes });
});

router.get('/create', isAuth, (req, res) => {
	res.render('notes/create', { pageTitle: 'Create Note', path: '/create', errorMessages: [] });
});

//TODO: creat isOwner middleware

router.post('/create', isAuth, async (req, res) => {
	const { title, description } = req.body;

	try {
		await notesService.create({ title, description, author: req.user._id });
	} catch (error) {
        const messages = extractErrorMessages(error);
		return res.render('notes/create', {
			pageTitle: 'Create Note',
			path: '/create',
            errorMessages: messages,
		});
	}

	res.redirect('/notes/all');
});

router.get('/:noteId/details', isAuth, async (req, res) => {
	const note = await notesService.getById(req.params.noteId);

	res.render('notes/details', { pageTitle: 'Note Details', path: '', note });
});

router.get('/:noteId/edit', isAuth, async (req, res) => {
	const note = await notesService.getById(req.params.noteId);

	res.render('notes/update', { pageTitle: 'Update Note', path: '', note });
});

router.post('/:noteId/edit', isAuth, async (req, res) => {
	const noteId = req.params.noteId;
	const { title, description } = req.body;
	const note = { title, description };

	try {
		await notesService.update(noteId, note);
	} catch (error) {
		console.log(error.message);
		return res.render('notes/update', {
			pageTitle: 'Update Note',
			path: '',
			note,
		});
	}

	res.redirect('/notes/all');
});

router.get('/:noteId/delete', isAuth, async (req, res) => {
	try {
		await notesService.delete(req.params.noteId);
	} catch (error) {
		console.log(error.message);
		return res.redirect('/');
	}

	res.redirect('/notes/all');
});

module.exports = router;
