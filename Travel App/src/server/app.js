// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// import necessary libraries

// Start up an instance of app
const express = require("express");
const app = express();

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// for async requests
const axios = require('axios').default;
const fetch = require('node-fetch');

// env variables
require('dotenv').config();

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('dist'))

//GET Route
app.get('/', function (req, res) {
    res.status(200).sendFile('dist/index.html')
})

// get route
app.get('/trip-details', (request, response) => {
    response.status(200).send(projectData);
});


// post route
app.post('/trip-details', (request, response) => {
    if (validateInput(request.body)) {
        const city = request.body.city;
        const date = request.body.date
        getDataFromGeoNames(process.env.GEONAMES_USER_NAME, city).then((locData) => {
            getDataFromWeatherBit(locData.lat, locData.lng, date).then(weatherData => {
                getDataFromPixabay(city).then(pixaData => {
                    const hit = pixaData.hits[0];
                    projectData = {
                        "temp": weatherData.temp,
                        "max_temp": weatherData.max_temp,
                        "min_temp": weatherData.min_temp,
                        "high_temp": weatherData.high_temp,
                        "date": weatherData.datetime,
                        "low_temp": weatherData.low_temp,
                        "description": weatherData.weather.description,
                        "previewURL": hit.previewURL,
                        "webformatURL": hit.webformatURL,
                        "largeImageURL": hit.largeImageURL
                    }
                    response.status(200).send("success");
                });
            })
        });
    } else {
        response.status(400).send('Bad Request');
    }

});


// GeoNames API
const getDataFromGeoNames = async (username, city) => {
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
    try {
        return await axios.get(url)
            .then(res => {
                return {
                    lat: res.data.geonames[0].lat,
                    lng: res.data.geonames[0].lng
                }
            });
    } catch (e) {
        console.log(e);
    }
}

// WeatherBit API
const getDataFromWeatherBit = async (lat, lang, date) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lang}&key=${process.env.WEATHER_BIT_API_KEY}`;
    const res = await fetch(url);

    try {
        const weatherData = await res.json();
        const dateDiff = calculateDuration(date);
        return dateDiff > 15 ? weatherData.data[15] : weatherData.data[dateDiff];
    } catch (e) {
        console.log(e);
    }
}

// Pixabay API
const getDataFromPixabay = async (city) => {
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${city}&image_type=photo`
    const res = await fetch(url);
    try {
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
    }
}

// helper functions
function validateInput(data) {
    return !(data.city === undefined || data.date === undefined);
}


// calculate number of days between today and next day
const calculateDuration = (date) => {
    const dateParts = date.split('-');
    const targetDate = new Date(dateParts[0],dateParts[1] - 1,dateParts[2]);
    const diff = targetDate - Date.now()
    const days = Math.round(diff / (24 * 60 * 60 * 1000))
    return days >= 0 ? days : 0
}

module.exports = app;