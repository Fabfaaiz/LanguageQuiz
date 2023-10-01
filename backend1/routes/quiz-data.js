const express = require('express');
const jwt = require('jsonwebtoken');
const route = express.Router();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authenticate = require('../middleware/authenticate');

route.use(cookieParser());
require('../db/connection');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};
route.use(cors(corsOptions));
route.use(cookieParser());

const Quiz = require('../models/quizSchema');

route.get('/quiz-data',authenticate, async (req,res)=>{
    try {
        const quizzes = await Quiz.find({});
        res.json(quizzes);
    } catch (err) {
        res.status(500).send('Server Error');
    }

})

module.exports = route;
