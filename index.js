
const express = require('express')
const app = express();
const apiRoutes = require('./api-routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = mongoose.connection;
const port = process.env.PORT || 8000;

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Use Api routes in the App
app.use('/api', apiRoutes)


// Connect to Mongoose and set connection variable
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/resthub',{ useNewUrlParser: true });



// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));


// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});



