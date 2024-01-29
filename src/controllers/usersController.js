const express = require('express');

const router = express.Router();

router.get('/register', (req, res) => {
	res.render('users/register', { pageTitle: 'Register', path: '/register' });
});

router.post('/register', (req, res) => {
	const { username, email, password, repeatPassword } = req.body;
	console.log(username, email, password, repeatPassword);
	res.redirect('/');
});

module.exports = router;
