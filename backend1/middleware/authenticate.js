const jwt = require('jsonwebtoken');
const User = require('../models/userSchema.js');

const authenticate = async (req,res,next) =>{
        try{
            const token = req.cookies.jwtoken;
            if(!token){
                throw new Error('User not authenticate');
            }
            // console.log(token);
        const authToken = jwt.verify(token,'shhhh');
        // console.log(authToken);
        const authUser =await User.findOne({_id:authToken._id, 'tokens.token': token}); 
        if(!authUser){
            throw new Error('User not authenticate 1');
        }
        req.authUser = authUser;
        next();
    }
    catch(err) {
        res.status(401).send('Unauthorized: No token Provided');
        console.log(err);
    }
}

module.exports = authenticate; 