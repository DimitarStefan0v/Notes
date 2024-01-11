const express = require('express');

const router = express.Router();

const homeController = require('./controllers/homeController');

router.use(homeController);

module.exports = router;