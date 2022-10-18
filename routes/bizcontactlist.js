const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// List business contacts
router.get('/', contactController.bizcontactList);

// Update business contact
router.get('/edit/:id', contactController.displayEditPage);
router.post('/edit/:id', contactController.processEditPage);

// Add business contact
router.get('/add', contactController.displayAddPage);
router.post('/add', contactController.processAddPage);

// Delete business contact
router.get('/delete/:id', contactController.performDelete);

module.exports = router;
