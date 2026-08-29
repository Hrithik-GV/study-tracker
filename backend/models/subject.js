const mongoose=require('mongoose')
const subjectSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true,

    },
    duration:{
        type:String,
        required:true,
    },
    topic:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('subject',subjectSchema)