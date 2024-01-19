const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const pageTitle = 'Home';
    const path = '/';
	res.render('home', { pageTitle, path });
});

module.exports = router;
