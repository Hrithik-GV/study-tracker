const subject = require('../models/subject');

exports.getSubjects = async (req, res, next) => {
  try {
    const subjects = await subject.find().sort({ _id: -1 });
    res.status(200).json(subjects);
  } catch (err) {
    console.error("Error fetching subjects:", err);
    res.status(500).json({ error: "Failed to fetch subjects from database", details: err.message });
  }
};

exports.postAddSubject = async (req, res, next) => {
  try {
    const { subjectName, duration, topic } = req.body;
    const subjectDetails = new subject({
      subject: subjectName, 
      duration,
      topic,
    });
    console.log("Saving subject:", subjectDetails);
    await subjectDetails.save();
    
    res.status(200).json(subjectDetails);
  } catch (err) {
    console.error("Error saving subject to DB:", err);
    res.status(500).json({ error: "Failed to save subject to database", details: err.message });
  }
};

exports.deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await subject.findByIdAndDelete(id);
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (err) {
    console.error("Error deleting subject:", err);
    res.status(500).json({ error: "Failed to delete subject", details: err.message });
  }
};

exports.updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subjectName, duration, topic } = req.body;
    const updatedSubject = await subject.findByIdAndUpdate(
      id,
      { subject: subjectName, duration, topic },
      { returnDocument: 'after', runValidators: true }
    );
    if (!updatedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(200).json(updatedSubject);
  } catch (err) {
    console.error("Error updating subject:", err);
    res.status(500).json({ error: "Failed to update subject", details: err.message });
  }
};

