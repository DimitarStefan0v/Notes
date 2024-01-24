const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const pageTitle = 'Home';
    const path = '/';
	res.render('home/home', { pageTitle, path });
});

module.exports = router;
