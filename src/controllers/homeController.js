const express = require('express');

const router = express.Router();
const notes = require('../utils/data');

router.get('/', async (req, res) => {
    const pageTitle = 'Home';

	res.render('home', { pageTitle, notes });
});

module.exports = router;
