const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('home/home', { pageTitle: 'Home', path: '/' });
});

router.get('/contacts', (req, res) => {
    res.render('home/contacts', { pageTitle: 'Contacts', path: '/contacts', errorMessages: [] });
});

module.exports = router;
