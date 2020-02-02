// Import modules
const express = require('express');
const router = express.Router();
// IMporting User schema
const User = require('../model/user');

// User Login Api
    router.post('/login',(req, res)=>{
    // find user with requested email
    User.findone({email :req.body.email}, function(err, user){
        if(user == null)
        {
            return res.status(400).send({
                    message:" User not found."
            });
        }
        else
        {
            if(user.validatePassword(req.body.password))
            {
                return res.status(200).send({
                    message: "User logged in."
                });
            }
            else
            {
                return res.send(400).send({
                    message :"Wrong password"
                });
            }
        }
    });
});

// User Sign in
router.post('/singup', (req, res, next) =>{
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    // set hash password
    newUser.setPasswordHash(req.body.password);
    // Save new user to db.
    newUser.save((err,User) =>{
    if(err)
    {
        res.status(400).send({
            message : "Failed to add user"
        });
    }
    else {
        res.status(201).send({
            message : "User added successfully"
        })
    }
}); 

});

//Export the module to be used in other part of the application.
module.exports = router;