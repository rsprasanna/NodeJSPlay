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

     UserSchema.methods.setPasswordHash =  function(password){
            // Creating unique salt for each user    
        this.salt = crypto.randomBytes(16).toString('hex');
        this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 100, 64,'sha512').toString('hex');
     };

     UserSchema.methods.validatePassword =  function(password){
         var hash = crypto.pbkdf2Sync(password, this.salt, 100,64,'sha512').toString('hex');
         return this.hash === hash;
     };

     // Exporting module to be used in other files for importing.
     const User = module.exports  = mongoose.model.toString('User', UserSchema);
