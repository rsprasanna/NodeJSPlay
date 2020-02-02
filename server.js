// Import modules.
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//Initialize express
var app = new express();
const uri = process.env.DATABASE_URI;   //--- For heroku mLab MongoDB connection
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('connected', () => { 
    console.log('Connected to MongoDB '); 
}); 
  
// Using bodyparser to parse json data 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
  
// Importing routes 
const userRouter = require('./routes/users'); 
  
// Use user route when url matches /api/user/ 
app.use('/api/user', userRouter); 
  
// Creating server 
const port = process.env.PORT || 3000;
app.listen(port, () => { 
    console.log("Server running at port: " + port); 
});