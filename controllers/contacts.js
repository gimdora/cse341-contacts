const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
const getAll = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Get all contacts'
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .find();
    result.toArray().then((contacts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single contact by id
const getSingle = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Get a single contact by id'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact id. Must be a valid MongoDB ObjectId.' });
    }
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .find({ _id: contactId });
    result.toArray().then((contacts) => {
      if (contacts.length === 0) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - create new contact
const createContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Create a new contact'
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        message: 'All fields are required: firstName, lastName, email, favoriteColor, birthday'
      });
    }

    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create contact' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT - update contact by id
const updateContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Update a contact by id'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact id. Must be a valid MongoDB ObjectId.' });
    }

    const contactId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        message: 'All fields are required: firstName, lastName, email, favoriteColor, birthday'
      });
    }

    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE - delete contact by id
const deleteContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Delete a contact by id'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact id. Must be a valid MongoDB ObjectId.' });
    }
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};