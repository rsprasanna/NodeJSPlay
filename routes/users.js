// Import modules
const express = require('express');
const router = express.Router();
// Importing User schema
const User = require('../models/user');

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
            if(user.validatePassword(req.body.userpassword))
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
router.post('/singup', (req, res) =>{
    // Creating empty user object 
    let newUser = new User(); 
  
    // Initialize newUser object with request data 
    newUser.name = req.body.name;
  
    newUser.email = req.body.email;
  
                    // Call setPassword function to hash password 
                    newUser.setPasswordHash(req.body.userPassword); 
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
// Export module to allow it to be imported in other files 
module.exports = router; 