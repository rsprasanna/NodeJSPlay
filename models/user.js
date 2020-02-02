// Importing modules
const mongoose = require('mongoose');
var crypto = require('crypto');

// Creating user schema.
 const UserSchema = mongoose.Schema(
     {
         name:{
             type: String,
             required: true
         },
         email:{
             type: String,
             required:true
         },
         passwordHash : String,
         salt: String
     });

     UserSchema.methods.setPasswordHash =  function(userPassword){
            // Creating unique salt for each user    
        this.salt = crypto.randomBytes(16).toString('hex');
        this.passwordHash = crypto.pbkdf2Sync(userPassword, this.salt, 100, 64,'sha512').toString('hex');
     };

    UserSchema.methods.validatePassword =  function(userPassword){
        var hash = crypto.pbkdf2Sync(userPassword, this.salt, 100, 64,'sha512').toString('hex');
        return hash === this.passwordHash;
    }; 
// Exporting module to allow it to be imported in other files 
const User = module.exports = mongoose.model('User', UserSchema); 