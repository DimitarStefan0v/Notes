router.post('/create', async (req, res) => {
	const note = req.body.note;
	notes.push(note);
	res.redirect('/notes/all');
});

router.get('/all', async (req, res) => {
	res.render('notes', { notes });
});

module.exports = router;
