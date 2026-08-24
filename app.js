//external module
const express=require('express')

//local module
const {authRouter}=require('./routes/authRouter')
const {pageRouter}=require('./routes/pageRouter');
const errorController=require('./controllers/errorController');


const app=express();

app.use((req,res,next)=>{
    console.log(req.url,req.method)
    next();
})

app.use(authRouter);
app.use(pageRouter);
app.use(errorController.pageNotFound);

const PORT=3001;
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})
