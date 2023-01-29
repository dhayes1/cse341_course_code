const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  // #swagger.tags = ['contacts']
  // #swagger.summary = 'Finds all contacts'
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res, next) => {
  // #swagger.tags = ['contacts']
  // #swagger.summary = 'Finds a single contact by ID'
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createContact = async (req, res) => {
  // #swagger.tags = ['contacts']
  // #swagger.summary = 'Adds a new contact'
  /* #swagger.paramaters['contact'] = {
        in: 'body',
        description: 'Add a new contact',
        schema: {
          $firstName: 'John',
          $lastName: 'Doe',
          $email: 'email@domain.com',
          $favoriteColor: 'Color',
          $birthday: 'MM/DD/YY',
          about: ''
        }
  } */
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'ERROR: Cannot create contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res, next) => {
  // #swagger.tags = ['contacts']
  // #swagger.summary = 'Update details of contact by ID'
  /* #swagger.paramaters['contact'] = {
        in: 'body',
        description: 'Update details of contact',
        schema: {
          properties:
            $firstName: 'John',
            $lastName: 'Doe',
            $email: 'email@domain.com',
            $favoriteColor: 'Color',
            $birthday: 'MM/DD/YY',
            about: ''
        }
  } */
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .updateOne({ _id: contactId }, { $set: contact });
    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'ERROR: Cannot update contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res, next) => {
  // #swagger.tags = ['contacts']
  // #swagger.summary = 'Delete a contact by ID'
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || `ERROR: Cannot delete contact. ${contactId}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };