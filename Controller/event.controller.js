import {Event }from '../Models/event.model.js';

const eventController = {
  getEvents: async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  },

  createEvent: async (req, res) => {
    try {
      const newEvent = new Event(req.body);
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ message: 'Bad Request' });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event Not Found' });
      }
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) {
        return res.status(404).json({ message: 'Event Not Found' });
      }
      res.json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

export default eventController; // Default export
