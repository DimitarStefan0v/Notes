const express = require('express');

const router = express.Router();
const notes = require('../utils/data');

router.get('/create', async (req, res) => {
	const pageTitle = 'Create';
    const path = '/notes/create';
	res.render('create', { pageTitle, path });
});

router.post('/create', async (req, res) => {
	const note = req.body.note;
	notes.push(note);
	res.redirect('/notes/all');
});

router.get('/all', async (req, res) => {
    const pageTitle = 'Notes';
    const path = '/notes/all'
    res.render('notes', { pageTitle, path, notes });
});

module.exports = router;
