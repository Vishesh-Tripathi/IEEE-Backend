import express from 'express';
import teamController from '../Controller/team.controller.js';

const trouter = express.Router();

// Route to add a new team member
trouter.post('/', teamController.addTeamMember);

// Route to update an existing team member
trouter.put('/:id', teamController.updateTeamMember);

// Route to delete a team member
trouter.delete('/:id', teamController.deleteTeamMember);

// Route to get all team members (optional)
trouter.get('/', teamController.getAllTeamMembers);

export default trouter; // Default export
