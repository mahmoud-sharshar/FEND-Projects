/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = '6e7d1aea4f38547bcbb4e84f306016d9';
const serverURL = 'http://127.0.0.1:4001'


document.getElementById('generate').addEventListener('click', generateWeather);

// generate button event handler
function generateWeather(e) {
    const zip_code = document.getElementById('zip').value
    console.log("zip code: " + zip_code);
    getWeather(baseURL, zip_code, apiKey)
        .then((data) => {
            console.log(data);
            if (data.cod === '404') {
                alert("Enter Valid zip code");
            } else {
                const d = new Date();
                const newDate = d.getMonth() + '-' + d.getDate() + '-' + d.getFullYear();
                addRetrievedData(serverURL + '/Weatherdata', {
                    temperature: data.main.temp,
                    date: newDate,
                    user_response: document.getElementById('feelings').value
                }).then((data) => {
                    getWeatherData(serverURL + '/Weatherdata')
                        .then((data) => {
                            console.log(data)
                            document.getElementById('temp').innerHTML  = 'Temperature: ' + data.temperature;
                            document.getElementById(('date')).innerHTML  = 'Date: ' + data.date;
                            document.getElementById('content').innerHTML  = 'User Feelings: ' + data.user_response;

                        });
                });
            }
        });

}

// get weather form OpenWeatherMap API
const getWeather = async (baseURL, zip_code, key) => {

    const res = await fetch(`${baseURL}?zip=${zip_code}&appid=${apiKey}`);
    try {
        return await res.json();
    } catch (error) {
        console.log("error", error);
    }
}


// post request to our server
const addRetrievedData = async (path, data) => {
    console.log(data);
    const res = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

// get request to the server
const getWeatherData = async (path) => {
    const res = await fetch(path);
    try {
        return await res.json();
    } catch (error) {
        console.log("error", error);
    }
}