// Import modules.
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//Initialize express
var app = new express();
const MONGODB_URI = process.env.DATABASE_URI; 
mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () => { 
    console.log('Connected to MongoDB '); 
}); 
  
// Using bodyparser to parse json data 
app.use(bodyparser.json()); 
  
// Importing routes 
const user = require('./route/user'); 
  
// Use user route when url matches /api/user/ 
app.use('/api/user', user); 
  
// Creating server 
const port = 3000; 
app.listen(port, () => { 
    console.log("Server running at port: " + port); 
});