const express = require('express');

const usersService = require('../services/usersService');

const router = express.Router();

router.get('/register', (req, res) => {
	res.render('users/register', { pageTitle: 'Register', path: '/register' });
});

router.post('/register', async (req, res) => {
	const { username, email, password, repeatPassword } = req.body;
	try {
		await usersService.register({ username, email, password, repeatPassword });
	} catch (error) {
		//TODO: pass the error message in the view
		console.log(error.message);
		return res.redirect('/users/register');
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
