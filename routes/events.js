const express = require('express');
const router = express.Router()
const usersController = require('../controllers/events.js')

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', usersController.createEvent);

router.put('/:id', usersController.updateEvent);

router.delete('/:id', usersController.deleteEvent);

module.exports = router;
