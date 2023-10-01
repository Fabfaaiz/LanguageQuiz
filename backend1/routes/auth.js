const express = require('express');
const jwt = require('jsonwebtoken');
const app = express.Router();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authenticate = require('../middleware/authenticate');
const saltRounds =10;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOptions));
app.use(cookieParser());
require('../db/connection');

const User = require('../models/userSchema');

app.get('/', (req, res) => {
    res.send("Welcome to backend authentication");
})

// app.post('/register',(req,res) =>{
//   const {Username, email, phone, work, password, confpassword} = req.body;

//   if(!Username || !email || !phone || !work || !password || !confpassword)
//     res.status(422).json({error:"plz fill the form properly"});

//    User.findOne({email:email}).then((userMatch) =>{
//     if(userMatch){
//          return res.status(422).json({error: "Email already exist"});
//     }
//     const user = new User({Username:Username, email:email, phone:phone, work:work, password:password, confpassword:confpassword});
//     console.log(user);
//     user.save().then(() =>{
//         res.status(201).json('Data added succesfully');
//     }).catch((err)=>{ res.status(500).send(err)})

//    }).catch((err) => console.log(err));
// })

//register
app.post('/register', async (req, res) => {
    const { Username, email, password, confpassword } = req.body;
   
    if (!Username || !email || !password || !confpassword){
        res.status(422).json({ error: "plz fill the form properly" });
        return; }
    try {
        const userNameMatch = await User.findOne({Username: Username});

        if(userNameMatch) {
            return res.status(422).json({ error: "Username already exist" });
        }

        const userMatch = await User.findOne({ email: email });
          
        if (userMatch) {
            return res.status(422).json({ error: "Email already exist" });
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const securepass = await bcrypt.hash(password,salt);
        const secureconfpass = await bcrypt.hash(confpassword,salt);

        if(securepass==secureconfpass){
        const user = new User({ Username: Username, email: email, password: securepass, confpassword: secureconfpass });

        await user.save();

        res.status(201).json('Data added succesfully');
        }
        else{
            res.status(422).json({error:'Password did not match'})
        }
    }
    catch (err) {
        console.log(err)
    }
});

// login
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(422).json({ error: "plz fill the form properly" });
        }
        const userLogin = await User.findOne({ email: email});
        if(!userLogin){
            res.status(422).json({error:'Email does not exist'});
        }
        const isMatch = await bcrypt.compare(password,userLogin.password);
        console.log(isMatch);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid Password" });
        }
        else {
            const token = await userLogin.generateAuthToken();
            // res.cookie('jwtoken',token,{
            //     // expires:new Date(Date.now(),300000),
            //     httpOnly: true
            // });
            res.cookie('jwtoken', token, {
                expires:new Date(Date.now()+300000),
                httpOnly: true,
                sameSite: 'none', 
                secure: true
            });
             res.json({ message: "User Logged in Success" });
        }
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/result', (req,res) =>{
        const token = req.cookie;
            if (token) {
                res.send(`Received your cookie with value: ${token}`);
            } else {
                res.send('No cookie found!');
            }
})

// app.post('/result',authenticate,(req,res) =>{
//     const {category,totalQuestions, correctAnswers} = req.body;
//     req.authUser.Grades.category.total_probable_points = req.authUser.Grades.category.total_probable_points + totalQuestions;
//     req.authUser.Grades.category.correct_answer = req.authUser.Grades.category.correct_answer + correctAnswers;
    
//     res.send({'Grades':req.authUser.Grades.category, 'Username':req.authUser.Username});
// })


app.post('/result', authenticate, (req, res) => {
    const { category, totalQuestions, correctAnswers } = req.body;
    
    if(!req.authUser.Grades[category]) {
        // Initialize category if it doesn't exist
        req.authUser.Grades[category] = {
            total_probable_points: 0,
            total_correct_answer: 0,
            score:0
        };
    }

    // Update the grade entry for the provided category
    req.authUser.Grades[category].total_probable_points += totalQuestions;
    req.authUser.Grades[category].total_correct_answer += correctAnswers;
    req.authUser.Grades[category].score = req.authUser.Grades[category].total_correct_answer/req.authUser.Grades[category].total_probable_points
    // Save the updated user
    req.authUser.save()
        .then(updatedUser => {
            res.send({
                'Grades': updatedUser.Grades[category], 
                'Username': updatedUser.Username
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user grades",
                error: err.message
            });
        });
});


app.get('/leaderboard/:category',authenticate, async (req, res) => {
    const category = req.params.category;

    // Ensure the category exists in the schema
    // if (!User.schema.path('Grades').caster.options.allowedValues.includes(category)) {
    //     return res.status(400).send({ message: 'Invalid category' });
    // }

    try {
        const users = await User.find({}, { Username: 1, Grades: 1 })
        .sort({ [`Grades.${category}.total_probable_points`]: -1 });
        res.json(users);
        
    } catch (err) {
        res.status(500).send({ message: 'Server Error', error: err.message });
    }
});


module.exports = app;

// Login TestCase
// {
//     "email":"test6@gmail.com",
//     "password":"test1"
//     }

// {
//     "Username":"Test",
//     "email":"test@gmail.com",
//     "password":"test",
//     "confpassword":"test"
//   }

// {
//     "category":"DOCKER",
//     "totalQuestions": 15,
//     "correctAnswers": 9
//   }