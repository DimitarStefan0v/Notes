const express = require('express');

const router = express.Router();

const usersService = require('../services/usersService');
const { extractErrorMessages } = require('../utils/errorHelpers');

router.get('/register', (req, res) => {
	res.render('users/register', { pageTitle: 'Register', path: '/register', errorMessages: [], userData: {} });
});

router.post('/register', async (req, res) => {
	// TODO if users is already logged in redirect him to 404
	const { username, email, password, repeatPassword } = req.body;
	try {
		await usersService.register({ username, email, password, repeatPassword });
	} catch (error) {
		//TODO: pass the error message in the view
		const messages = extractErrorMessages(error);
		console.log(messages);
		return res.render('users/register', {
			pageTitle: 'Register',
			path: '/register',
			errorMessages: messages,
			userData: { username, email, password, repeatPassword },
		});
	}

	res.redirect('/');
});

router.get('/login', (req, res) => {
	res.render('users/login', { pageTitle: 'Login', path: '/login' });
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		const token = await usersService.login(username, password);
		res.cookie('auth', token, { httpOnly: true });
	} catch (error) {
		//TODO: pass the error message in the view
		console.log(error.message);
		return res.redirect('/users/login');
	}

	res.redirect('/');
});

router.get('/logout', (req, res) => {
	res.clearCookie('auth');
	res.redirect('/');
});

module.exports = router;
