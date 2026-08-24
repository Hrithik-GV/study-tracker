const express=require('express');
const pageRouter=express.Router;

//local module
const pageController=require('../controllers/pageController');

pageRouter.get("/dashboard",pageController.getDashboard);

pageRouter.get("/add-subject",pageController.getAddSubject);

pageRouter.post("/add-subject",pageController.postAddSubject);

pageRouter.get("/add-studySession",pageController.getAddStudySession);

pageRouter.post("/add-studySession",pageController.postAddStudySession);

pageRouter.get("/view-studySession",pageController.getViewStudySession);


//exports
exports.pageRouter=pageRouter;