const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
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
};

const insertNew = async (req, res) => {
  const newContact = {
    firstName: "Darkwing",
    lastName: "Duck",
    email: "darkwing.duck@hero.com",
    favoriteColor: "Purple",
    birthday: "01/05/83"
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(newContact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'ERROR: Cannot create contact.');
  }
};

module.exports = { getAll, getSingle, insertNew };