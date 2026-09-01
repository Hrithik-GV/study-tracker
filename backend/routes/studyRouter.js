const express = require('express');
const studyRouter = express.Router();

const studyController = require('../controllers/studyController');

// GET all subjects
studyRouter.get("/", studyController.getSubjects);

// POST add new subject
studyRouter.post("/add-subject", studyController.postAddSubject);

studyRouter.get("/add-subject", studyController.getAddSubject);

// DELETE subject by ID
studyRouter.delete("/:id", studyController.deleteSubject);

// UPDATE subject by ID
studyRouter.put("/:id/update-subject",studyController.updateSubject);


exports.studyRouter = studyRouter;