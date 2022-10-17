const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

router.get('/list', contactController.contactList);

module.exports = router;
