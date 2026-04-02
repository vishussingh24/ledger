const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


// User Registration Controller
// api endpoint: POST /auth/register


function userRegisterController(req, res){
    const {email, name, password} = req.body;

    const isUserExist = userModel.findOne({
        email: email
    });

    if(isUserExist){
        return res.status(400).json({
            message: "Email already exist",
            status: "false"
        })
    }

    const newUser = new userModel({
        email, name, password
    })
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}



module.exports = {
    userRegisterController
}

