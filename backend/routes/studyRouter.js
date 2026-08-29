const express=require('express');
const studyRouter=express.Router();

//local module
const studyController=require('../controllers/studyController');



studyRouter.get("/add-subject",studyController.getAddSubject);

studyRouter.post("/add-subject",studyController.postAddSubject);


//exports
exports.studyRouter=studyRouter;