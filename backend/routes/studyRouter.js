const express = require('express');
const studyRouter = express.Router();

const studyController = require('../controllers/studyController');
const isAuth=require('../middleware/isAuth')

// GET all subjects for a specific user
studyRouter.get("/:userId", isAuth, studyController.getSubjects);

// POST add new subject for a specific user
studyRouter.post("/add-subject/:userId", isAuth, studyController.postAddSubject);

// DELETE subject by ID
studyRouter.delete("/:id", isAuth, studyController.deleteSubject);

// UPDATE subject by ID
studyRouter.put("/:id/update-subject", isAuth, studyController.updateSubject);

exports.studyRouter = studyRouter;