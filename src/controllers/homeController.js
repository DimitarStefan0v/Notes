const express = require('express');

const { isRequired } = require('../utils/commonValidation');
const { ERROR_MESSAGES } = require('../utils/errorMessages');
const { extractErrorMessages } = require('../utils/errorHelpers');
const emailsService = require('../services/emailsService');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('home/home', { pageTitle: 'Home', path: '/' });
});

// router.get('/contacts', (req, res) => {
// 	res.render('home/contacts', {
// 		pageTitle: 'Contacts',
// 		path: '/contacts',
// 		errorMessages: [],
// 		emailContent: {},
// 	});
// });

// router.post('/contacts', async (req, res) => {
// 	const emailContent = {
// 		email: req.body.email,
// 		message: req.body.message,
// 	};

// 	const errors = [];

// 	isRequired(emailContent.email)
// 		? (emailContent.email = emailContent.email.trim())
// 		: errors.push(ERROR_MESSAGES.REQUIRED('Email'));
// 	isRequired(emailContent.message)
// 		? (emailContent.message = emailContent.message.trim())
// 		: errors.push(ERROR_MESSAGES.REQUIRED('Message content'));

// 	try {
// 		if (errors.length > 0) {
// 			throw errors;
// 		}

// 		if (emailContent.message.length < 10) {
// 			errors.push(ERROR_MESSAGES.MIN_LENGTH('Message content', 10));
// 			throw errors;
// 		}

// 		const isEmailValid =
// 			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
// 				emailContent.email
// 			);
// 		if (!isEmailValid) {
// 			errors.push(ERROR_MESSAGES.EMAIL_REGEX);
// 			throw errors;
// 		}

//         await emailsService.send(process.env.MY_EMAIL, emailContent.email, emailContent.message);
// 	} catch (error) {
// 		const messages = extractErrorMessages(error);
// 		return res.render('home/contacts', {
// 			pageTitle: 'Contacts',
// 			path: '/contacts',
// 			errorMessages: messages,
// 			emailContent,
// 		});
// 	}

// 	res.redirect('/');
// });

module.exports = router;
