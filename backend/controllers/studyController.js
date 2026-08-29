const subject=require('../models/subject')


exports.postAddSubject=async(req,res,next)=>{
    console.log(req.url);
    const{subjectName,duration,topic}=req.body;
    const subjectDetails=new subject({subjectName,duration,topic});
    console.log(subjectDetails);
    await subjectDetails.save();
    res.status(200).json(subjectDetails);
}

exports.getAddSubject=(req,res,next)=>{
    console.log(req.url);
}

