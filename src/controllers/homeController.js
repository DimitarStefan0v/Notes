const express = require('express');

const { isRequired } = require('../utils/commonValidation');
const { ERROR_MESSAGES } = require('../utils/errorMessages');
const { extractErrorMessages } = require('../utils/errorHelpers');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('home/home', { pageTitle: 'Home', path: '/' });
});

router.get('/contacts', (req, res) => {
	res.render('home/contacts', {
		pageTitle: 'Contacts',
		path: '/contacts',
		errorMessages: [],
		emailContent: {},
	});
});

router.post('/contacts', (req, res) => {
	const emailContent = {
		email: req.body.email,
		message: req.body.message,
	};

	const errors = [];

	isRequired(emailContent.email)
		? (emailContent.email = emailContent.email.trim())
		: errors.push(ERROR_MESSAGES.REQUIRED('Email'));
	isRequired(emailContent.message)
		? (emailContent.message = emailContent.message.trim())
		: errors.push(ERROR_MESSAGES.REQUIRED('Message content'));

	try {
		if (errors.length > 0) {
			throw errors;
		}

        
		// TODO send email if there are no errors
	} catch (error) {
		const messages = extractErrorMessages(error);
		return res.render('home/contacts', {
			pageTitle: 'Contacts',
			path: '/contacts',
			errorMessages: messages,
			emailContent,
		});
	}

    res.redirect('/');
});

module.exports = router;
