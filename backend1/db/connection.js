const mongoose = require('mongoose');

const DB= 'mongodb+srv://faaiz:dravid@cluster0.sk1lbsl.mongodb.net/Quiz-app?retryWrites=true&w=majority'

// const DB = `${process.env.DATABASE}`;
mongoose.connect(DB,{
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(() => {
console.log('connection success');
}).catch((err) =>{console.log('Failed')});