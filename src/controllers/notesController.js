const express = require('express');

const { isAuth } = require('../middlewares/authMiddleware');
const notesService = require('../services/notesService');
const { extractErrorMessages } = require('../utils/errorHelpers');
const { isRequired } = require('../utils/commonValidation');
const { ERROR_MESSAGES } = require('../utils/errorMessages');

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
	res.render('notes/create', {
		pageTitle: 'Create Note',
		path: '/create',
		errorMessages: [],
		noteData: {},
	});
});

router.post('/create', isAuth, async (req, res) => {
	const noteData = {
		title: req.body.title,
		description: req.body.description,
		author: req.user._id,
	};

	const errors = [];

	isRequired(noteData.title)
		? (noteData.title = noteData.title.trim())
		: errors.push(ERROR_MESSAGES.REQUIRED('Title'));
	isRequired(noteData.description)
		? (noteData.description = noteData.description.trim())
		: errors.push(ERROR_MESSAGES.REQUIRED('Description'));

	try {
		if (errors.length > 0) {
			throw errors;
		}

		await notesService.create(noteData);
	} catch (error) {
		const messages = extractErrorMessages(error);
		return res.render('notes/create', {
			pageTitle: 'Create Note',
			path: '/create',
			errorMessages: messages,
			noteData,
		});
	}

	res.redirect('/notes/all');
});

router.get('/:noteId/details', isAuth, async (req, res) => {
	const note = await notesService.getById(req.params.noteId);
	if (req.user._id !== note.author.toString()) {
		return res.redirect('/404');
	}

	res.render('notes/details', { pageTitle: 'Note Details', path: '', note });
});

router.get('/:noteId/edit', isAuth, async (req, res) => {
	const noteData = await notesService.getById(req.params.noteId);
	if (req.user._id !== noteData.author.toString()) {
		return res.redirect('/404');
	}

	res.render('notes/update', { pageTitle: 'Update Note', path: '', errorMessages: [], noteData });
});

router.post('/:noteId/edit', isAuth, async (req, res) => {
	const noteId = req.params.noteId;
	const author = await notesService.getAuthor(noteId);
	if (req.user._id !== author.author.toString()) {
		return res.redirect('/404');
	}

	const noteData = {
		title: req.body.title,
		description: req.body.description,
	};

	const errors = [];

	isRequired(noteData.title)
		? (noteData.title = noteData.title.trim())
		: errors.push(ERROR_MESSAGES.REQUIRED('Title'));
	isRequired(noteData.description)
		? (noteData.description = noteData.description.trim())
		: errors.push(ERROR_MESSAGES.REQUIRED('Description'));

	try {
        if (errors.length > 0) {
            throw errors;
        }

		await notesService.update(noteId, noteData);
	} catch (error) {
		const messages = extractErrorMessages(error);
		return res.render('notes/update', {
			pageTitle: 'Update Note',
			path: '',
            errorMessages: messages,
			noteData,
		});
	}

	res.redirect('/notes/all');
});

router.get('/:noteId/delete', isAuth, async (req, res) => {
	const noteId = req.params.noteId;
	const author = await notesService.getAuthor(noteId);
	if (req.user._id !== author.author.toString()) {
		return res.redirect('/404');
	}

	try {
		await notesService.delete(noteId);
	} catch (error) {
		console.log(error.message);
		return res.redirect('/');
	}

	res.redirect('/notes/all');
});

module.exports = router;
