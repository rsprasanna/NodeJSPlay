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
  
// Importing routes 
const user = require('./route/user'); 
  
// Use user route when url matches /api/user/ 
app.use('/api/user', user); 
  
// Creating server 
const port = 3000; 
app.listen(port, () => { 
    console.log("Server running at port: " + port); 
});