const express = require('express');
const studyRouter = express.Router();

const studyController = require('../controllers/studyController');

// GET all subjects
studyRouter.get("/", studyController.getSubjects);

// POST add new subject
studyRouter.post("/add-subject", studyController.postAddSubject);

// DELETE subject by ID
studyRouter.delete("/:id", studyController.deleteSubject);

studyRouter.get("/add-subject", studyController.getAddSubject);

exports.studyRouter = studyRouter;