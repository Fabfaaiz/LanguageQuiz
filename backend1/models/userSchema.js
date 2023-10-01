const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confpassword: {
        type: String,
        required: true
    },
    Grades: {
        SQL: {
            total_probable_points: {
                type: Number,
                default: 0
            },
            total_correct_answer: {
                type: Number,
                default: 0
            },
            score: {
                type: Number,
                default: 0
            }
        },
        Docker: {
            total_probable_points: {
                type: Number,
                default: 0
            },
            total_correct_answer: {
                type: Number,
                default: 0
            },
            score: {
                type: Number,
                default : 0
            }
        },
        Code: {
            total_probable_points: {
                type: Number,
                default: 0
            },
            total_correct_answer: {
                type: Number,
                default: 0
            },
            score: {
                type: Number,
                default : 0
            }
        },
        Linux: {
            total_probable_points: {
                type: Number,
                default: 0
            },
            total_correct_answer: {
                type: Number,
                default: 0
            },
            score: {
                type: Number,
                default : 0
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// we ere generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        let generatetoken = jwt.sign({ _id: this._id }, 'shhhh');
        if(!this.tokens.token){
        this.tokens = this.tokens.concat({ token: generatetoken });
        }
        await this.save();
        return generatetoken;
    } catch (err) {
        console.log(err);
    }
};

const User = mongoose.model('TEST', userSchema);

module.exports = User;