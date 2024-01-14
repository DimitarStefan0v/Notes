const express = require('express');

const router = express.Router();

const homeController = require('./controllers/homeController');
const notesController = require('./controllers/notesController');

router.use(homeController);
router.use('/notes', notesController);

module.exports = router;
