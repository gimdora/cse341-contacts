const router = require('express').Router();
const contactsController = require('../controllers/contacts');

// GET all contacts
router.get('/', contactsController.getAll);

// GET single contact by id
router.get('/:id', contactsController.getSingle);

module.exports = router;
