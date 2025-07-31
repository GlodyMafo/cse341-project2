const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('events').find();
    const events = await result.toArray();
    res.setHeader('content-type', 'application/json');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const eventId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('events').find({ _id: eventId });
    const events = await result.toArray();
    if (!events[0]) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.setHeader('content-type', 'application/json');
    res.status(200).json(events[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event', error: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: new Date(req.body.date),
      capacity: req.body.capacity,
      ticketPrice: req.body.ticketPrice,
      organizer: req.body.organizer,
      createdAt: new Date()
    };

    const response = await mongodb.getDatabase().db().collection('events').insertOne(event);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Event created successfully', eventId: response.insertedId });
    } else {
      res.status(500).json({ message: `Can't create the event, some error occurred` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event', error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const eventId = new ObjectId(req.params.id);

    const event = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: new Date(req.body.date),
      capacity: req.body.capacity,
      ticketPrice: req.body.ticketPrice,
      organizer: req.body.organizer,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const response = await mongodb.getDatabase().db().collection('events').replaceOne({ _id: eventId }, event);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Event not found or no changes applied' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event', error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const eventId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('events').deleteOne({ _id: eventId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createEvent,
  updateEvent,
  deleteEvent
};
