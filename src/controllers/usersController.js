const express = require('express');

const router = express.Router();

const usersService = require('../services/usersService');
const { extractErrorMessages } = require('../utils/errorHelpers');
const { registerValidation, loginValidation } = require('../utils/commonValidation');

router.get('/register', (req, res) => {
	res.render('users/register', {
		pageTitle: 'Register',
		path: '/register',
		errorMessages: [],
		userData: {},
	});
});

router.post('/register', async (req, res) => {
	// TODO if users is already logged in redirect him to 404
	const { username, email, password, repeatPassword } = req.body;
	const result = await registerValidation({
		username,
		email,
		password,
		repeatPassword,
	});

	try {
		if (result.errors.length > 0) {
			throw result.errors;
		}

		await usersService.register(result.trimmedUserData);
	} catch (error) {
		const messages = extractErrorMessages(error);

		return res.render('users/register', {
			pageTitle: 'Register',
			path: '/register',
			errorMessages: messages,
			userData: result.trimmedUserData,
		});
	}

	res.redirect('/');
});

router.get('/login', (req, res) => {
	res.render('users/login', {
		pageTitle: 'Login',
		path: '/login',
		errorMessages: [],
		userData: {},
	});
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
    const result = loginValidation({ username, password });

	try {
        if (result.errors.length > 0) {
            throw result.errors;
        }

		const token = await usersService.login(result.trimmedUserData);
		res.cookie('auth', token, { httpOnly: true });
	} catch (error) {
		const messages = extractErrorMessages(error);
		return res.render('users/login', {
			pageTitle: 'Login',
			path: '/login',
			errorMessages: messages,
			userData: result.trimmedUserData,
		});
	}

	res.redirect('/');
});

router.get('/logout', (req, res) => {
	res.clearCookie('auth');
	res.redirect('/');
});

module.exports = router;
