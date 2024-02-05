const express = require('express');

const router = express.Router();

const usersService = require('../services/usersService');
const { extractErrorMessages } = require('../utils/errorHelpers');
const { isRequired } = require('../utils/commonValidation');
const { ERROR_MESSAGES } = require('../utils/errorMessages');

router.get('/register', (req, res) => {
	if (req.user) {
        return res.redirect('/users/logout');
    }

	res.render('users/register', {
		pageTitle: 'Register',
		path: '/register',
		errorMessages: [],
		userData: {},
	});
});

router.post('/register', async (req, res) => {
	if (req.user) {
        return res.redirect('/users/logout');
    }

	const userData = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		repeatPassword: req.body.repeatPassword,
	};

	const errors = [];

	isRequired(userData.username)
		? (userData.username = userData.username.trim())
		: errors.push(ERROR_MESSAGES.REQUIRED('Username'));
    isRequired(userData.email)
        ? (userData.email = userData.email.trim())
        : errors.push(ERROR_MESSAGES.REQUIRED('Email'));
    isRequired(userData.password)
        ? (userData.password = userData.password.trim())
        : errors.push(ERROR_MESSAGES.REQUIRED('Password'));

	try {
		if (errors.length > 0) {
			throw errors;
		}

		await usersService.register(userData);
	} catch (error) {
		const messages = extractErrorMessages(error);

		return res.render('users/register', {
			pageTitle: 'Register',
			path: '/register',
			errorMessages: messages,
			userData,
		});
	}

	res.redirect('/');
});

router.get('/login', (req, res) => {
	if (req.user) {
        return res.redirect('/users/logout');
    }

	res.render('users/login', {
		pageTitle: 'Login',
		path: '/login',
		errorMessages: [],
		userData: {},
	});
});

router.post('/login', async (req, res) => {
	if (req.user) {
        return res.redirect('/users/logout');
    }

	const userData = {
		username: req.body.username,
		password: req.body.password,
    };

	const errors = [];

	isRequired(userData.username)
		? (userData.username = userData.username.trim())
		: errors.push(ERROR_MESSAGES.REQUIRED('Username'));
    isRequired(userData.password)
        ? (userData.password = userData.password.trim())
        : errors.push(ERROR_MESSAGES.REQUIRED('Password'));

	try {
		if (errors.length > 0) {
			throw errors;
		}

		const token = await usersService.login(userData);
		res.cookie('auth', token, { httpOnly: true });
	} catch (error) {
		const messages = extractErrorMessages(error);
		return res.render('users/login', {
			pageTitle: 'Login',
			path: '/login',
			errorMessages: messages,
			userData,
		});
	}

	res.redirect('/');
});

router.get('/logout', (req, res) => {
    if (!req.user) {
        return res.redirect('/404');
    }

	res.clearCookie('auth');
	res.redirect('/');
});

module.exports = router;
