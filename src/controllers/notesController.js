const express = require('express');

const router = express.Router();
const notes = [];

router.get('/create', async (req, res) => {
	res.render('create');
});

router.post('/create', async (req, res) => {
	const note = req.body.note;
	notes.push(note);
	res.redirect('/notes/all');
});

router.get('/all', async (req, res) => {
	res.render('notes', { notes });
});

module.exports = router;
