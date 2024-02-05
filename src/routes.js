const express = require('express');

const router = express.Router();

const homeController = require('./controllers/homeController');
const notesController = require('./controllers/notesController');
const usersController = require('./controllers/usersController');

router.use(homeController);
router.use('/notes', notesController);
router.use('/users', usersController);

router.get('*', (req, res) => {
    res.status(404).render('404', { pageTitle: 'Register', path: '', });
});

module.exports = router;
