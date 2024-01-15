const express = require('express');

const router = express.Router();
const notes = [];

router.get('/create', async (req, res) => {
    const pageTitle = 'Create';
	res.render('notes/create', {pageTitle});
});

router.post('/create', async (req, res) => {
	const note = req.body.note;
	notes.push(note);
	res.redirect('/notes/all');
});

router.get('/all', async (req, res) => {
    const pageTitle = 'Notes';
	res.render('notes/notes', { notes, pageTitle });
});

module.exports = router;
