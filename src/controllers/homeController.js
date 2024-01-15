const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const pageTitle = 'Home';
	res.render('home/home', { pageTitle });
});

module.exports = router;
