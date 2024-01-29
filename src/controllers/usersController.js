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
        console.log(error.message);
    }

	res.redirect('/');
});

router.get('/login', (req, res) => {
	res.render('users/login', { pageTitle: 'Login', path: '/login' });
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);
	res.redirect('/');
});

router.get('/logout', (req, res) => {
	res.redirect('/');
});

module.exports = router;
