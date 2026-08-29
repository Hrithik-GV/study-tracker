require('dotenv').config()
//external module
const express=require('express')
const cors=require('cors')

//local module
const connectDB=require('./config/db');
const {studyRouter}=require('./routes/studyRouter');
const errorController=require('./controllers/errorController');


const app=express();

connectDB();


app.use((req,res,next)=>{
    console.log(req.url,req.method)
    next();
})

app.use(express.json());
app.use(cors());

app.use("/api/subject",studyRouter);
app.use(errorController.pageNotFound);

app

const PORT= process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})
