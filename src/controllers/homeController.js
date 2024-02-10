const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('home/home', { pageTitle: 'Home', path: '/' });
});

router.get('/contacts', (req, res) => {
	res.render('home/contacts', {
		pageTitle: 'Contacts',
		path: '/contacts',
		errorMessages: [],
	});
});

router.post('/contacts', (req, res) => {
	const { email, message } = req.body;
    console.log(email, message);

    res.redirect('/');
});

module.exports = router;
