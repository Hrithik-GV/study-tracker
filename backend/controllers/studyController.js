const subject = require('../models/subject');
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
exports.getAddSubject = (req, res, next) => {
  console.log(req.url);
};

