//external module
const express=require('express')

const app=express();

app.use((req,res,next)=>{
    console.log(req.url,req.method)
    next();
})

const PORT=3001;
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})
