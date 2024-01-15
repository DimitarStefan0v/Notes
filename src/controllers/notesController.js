const express = require('express');

const router = express.Router();
const notes = require('../utils/data');

router.get('/create', async (req, res) => {
    const pageTitle = 'Create';
	res.render('create', {pageTitle});
});

router.post('/create', async (req, res) => {
	const note = req.body.note;
	notes.push(note);
	res.redirect('/');
});

module.exports = router;
