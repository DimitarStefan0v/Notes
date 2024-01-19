const express = require('express');

const router = express.Router();

const notesService = require('../services/notesService');

router.get('/create', async (req, res) => {
	const pageTitle = 'Create';
	const path = '/notes/create';

	res.render('create', { pageTitle, path });
});

router.post('/create', async (req, res) => {
	const { title, description } = req.body;
    try {
        await notesService.create({ title, description });
    } catch (error) {
        console.log(error.message);
    }

	res.redirect('/notes/all');
});

router.get('/all', async (req, res) => {
	const pageTitle = 'Notes';
	const path = '/notes/all';
	const notes = await notesService.getAll();

	res.render('notes', { pageTitle, path, notes });
});

module.exports = router;
