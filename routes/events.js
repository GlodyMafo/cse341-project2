const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const eventsController = require('../controllers/events.js');

// Validation error Middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET all 
router.get('/', eventsController.getAll);

// GET single 
router.get('/:id', eventsController.getSingle);

// POST 
router.post(
  '/',
  [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('location').notEmpty().withMessage('Location is required'),
    check('date').isISO8601().withMessage('Date must be a valid ISO8601 date'),
    check('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
    check('ticketPrice').isFloat({ min: 0 }).withMessage('Ticket price must be a positive number or zero'),
    check('organizer').notEmpty().withMessage('Organizer is required')
  ],
  validate,
  eventsController.createEvent
);

// PUT 
router.put(
  '/:id',
  [
    check('title').optional().notEmpty().withMessage('Title cannot be empty'),
    check('description').optional().notEmpty().withMessage('Description cannot be empty'),
    check('location').optional().notEmpty().withMessage('Location cannot be empty'),
    check('date').optional().isISO8601().withMessage('Date must be a valid ISO8601 date'),
    check('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
    check('ticketPrice').optional().isFloat({ min: 0 }).withMessage('Ticket price must be a positive number or zero'),
    check('organizer').optional().notEmpty().withMessage('Organizer cannot be empty')
  ],
  validate,
  eventsController.updateEvent
);

// DELETE 
router.delete('/:id', eventsController.deleteEvent);

module.exports = router;
