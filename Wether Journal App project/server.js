// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// import necessary libraries
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();
/*
      Middleware
*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server start listening on port ${PORT}`);
});


// get route
app.get('/Weatherdata', (request, response) => {
    response.send(projectData);
});


// post route
app.post('/Weatherdata', (request, response) => {
    const newdata = request.body;
    console.log('post request');
    if (validateInput(newdata)) {
        projectData = newdata;
        console.log(projectData);
        response.status(200).send('success');
    } else {
        response.status(400).send('Bad Request');
    }

});

function validateInput(data) {
    return !(data.temperature === undefined || data.date === undefined || data.user_response === undefined);
}