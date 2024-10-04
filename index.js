import express from 'express';
import cors from 'cors';
import connectDB from './DB/DB.js';
import dotenv from 'dotenv';
import { app } from './app.js';
dotenv.config({
    path:"./env"
})




const port = process.env.PORT || 5000;
app.get('/v1',(req,res)=>{
    res.send("Hello from express")
})
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
})
.catch((err)=>{
    console.log(err)
})

