// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express') ;

// Start up an instance of app
const app = express() ;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser') ;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors') ;
app.use(cors()) ;

// pointing to the main client-side folder
app.use(express.static('website'));


// Setup Server with a callback to debug
app.listen(3000, function() {console.log('Server is set up')}) ;

// post route to recieve and save data
app.post('/saveToEndPoint', saveToEndPoint) ;
function saveToEndPoint(req, res)
{
    projectData.date = req.body.date,
    projectData.temperature = req.body.temperature,
    projectData.feeling = req.body.feeling 
}

// get route to update UI with the end point data
app.get('/updateUI', endPointToUI) ;
function endPointToUI(request, response)
{
    response.send(projectData) ;
}