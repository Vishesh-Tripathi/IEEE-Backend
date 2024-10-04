import { Team } from '../Models/team.model.js';

const teamController = {
  // Add a new team member
  addTeamMember: async (req, res) => {
    try {
      const newTeamMember = new Team(req.body);
      console.log(newTeamMember);
      await newTeamMember.save();
      res.status(201).json(newTeamMember);
    } catch (error) {
      res.status(400).json({ message: 'Bad Request', error: error.message });
    }
  },

  // Update a team member
  updateTeamMember: async (req, res) => {
    try {
      const updatedTeamMember = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTeamMember) {
        return res.status(404).json({ message: 'Team Member Not Found' });
      }
      res.json(updatedTeamMember);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  },

  // Delete a team member
  deleteTeamMember: async (req, res) => {
    try {
      const deletedTeamMember = await Team.findByIdAndDelete(req.params.id);
      if (!deletedTeamMember) {
        return res.status(404).json({ message: 'Team Member Not Found' });
      }
      res.json({ message: 'Team Member deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  },

  // Get all team members (optional)
  getAllTeamMembers: async (req, res) => {
    try {
      const teamMembers = await Team.find();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }
};

export default teamController; // Default export
