import express from 'express';
import { Router } from 'express';
const eventrouter = Router();
import eventController  from'../Controller/event.controller.js'

// const eventController = require('../Controller/event.controller.js');

eventrouter.get('/', eventController.getEvents);
eventrouter.post('/', eventController.createEvent);
eventrouter.put('/:id', eventController.updateEvent);
eventrouter.delete('/:id', eventController.deleteEvent);

export default eventrouter;
