const mongoose = require('mongoose');
const subject = require('../models/subject');

// GET /api/subject/:userId
exports.getSubjects = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Ensure users can only fetch their own subjects
    if (!req.session?.user?.id || req.session.user.id.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Forbidden. You can only view your own subjects." });
    }

    const subjects = await subject.find({ userId }).sort({ _id: -1 });
    res.status(200).json(subjects);
  } catch (err) {
    console.error("Error fetching subjects:", err);
    res.status(500).json({ error: "Failed to fetch subjects from database", details: err.message });
  }
};

// POST /api/subject/add-subject/:userId
exports.postAddSubject = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { subjectName, duration, topic } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Ensure users can only add subjects for their own account
    if (!req.session?.user?.id || req.session.user.id.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Forbidden. You can only add subjects to your own account." });
    }

    const subjectDetails = new subject({
      subject: subjectName, 
      duration,
      topic,
      userId,
    });
    await subjectDetails.save();
    
    res.status(200).json(subjectDetails);
  } catch (err) {
    console.error("Error saving subject to DB:", err);
    res.status(500).json({ error: "Failed to save subject to database", details: err.message });
  }
};

// DELETE /api/subject/:id
exports.deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid subject ID format" });
    }

    // Delete only if subject belongs to the logged-in user
    const deletedSubject = await subject.findOneAndDelete({
      _id: id,
      userId: req.session.user.id,
    });

    if (!deletedSubject) {
      return res.status(404).json({ error: "Subject not found or unauthorized to delete" });
    }

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (err) {
    console.error("Error deleting subject:", err);
    res.status(500).json({ error: "Failed to delete subject", details: err.message });
  }
};

// PUT /api/subject/:id/update-subject
exports.updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subjectName, duration, topic } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid subject ID format" });
    }

    // Update only if subject belongs to the logged-in user
    const updatedSubject = await subject.findOneAndUpdate(
      { _id: id, userId: req.session.user.id },
      { subject: subjectName, duration, topic },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ error: "Subject not found or unauthorized to update" });
    }

    res.status(200).json(updatedSubject);
  } catch (err) {
    console.error("Error updating subject:", err);
    res.status(500).json({ error: "Failed to update subject", details: err.message });
  }
};


