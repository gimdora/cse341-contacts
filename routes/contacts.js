const router = require('express').Router();
const contactsController = require('../controllers/contacts');

// GET all contacts
router.get('/', contactsController.getAll);

// GET single contact by id
router.get('/:id', contactsController.getSingle);

// POST - create new contact
router.post('/', contactsController.createContact);

// PUT - update contact by id
router.put('/:id', contactsController.updateContact);

// DELETE - delete contact by id
router.delete('/:id', contactsController.deleteContact);

module.exports = router;