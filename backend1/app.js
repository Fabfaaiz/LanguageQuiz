const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


require('./db/connection');


const middleware = (req,res,next) =>{
    console.log('Hi middleware');
    next();
}

app.use(express.json());

app.use(cookieParser());

app.use(require('./routes/auth'),middleware);

app.use(require('./routes/quiz-data'));

app.get('/',(req,res) =>{
    res.send("Welcome to backend");
})


app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})