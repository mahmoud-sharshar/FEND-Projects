// restrict user not to select previous date
window.addEventListener('load', () => {
    document.getElementById('start-date-input').setAttribute('min', Client.getTodayDate());
    document.getElementById('end-date-input').setAttribute('min', Client.getTodayDate());
    document.getElementById('start-date-input').setAttribute('value', Client.getTodayDate());
    document.getElementById('end-date-input').setAttribute('value', Client.getTodayDate());
});


// handle form submit
document.getElementById('travel-form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    // check the end date is after the start date
    const startDate = document.getElementById('start-date-input').value;
    const endDate = document.getElementById('end-date-input').value
    if (Client.endAfterStart(startDate, endDate)) {
        const data = {
            city: document.getElementById('location-input').value,
            date: startDate
        }
        fetch("http://localhost:4001/trip-details", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then((res) => {
            fetch("http://localhost:4001/trip-details")
                .then((response) => response.json())
                .then(data => updateUI(data));
        });
    }else{
        alert("End date must be after start date!!")
    }
});


const updateUI = (data) => {
    const div_trip = document.getElementById("trip-status")
    if (div_trip) {
        div_trip.remove();
    }
    const divElement = document.createElement('div');
    divElement.id = "trip-status";
    // image
    const imgDiv = document.createElement('div')
    imgDiv.id = "img-block"
    const img = document.createElement('img');
    img.src = data.webformatURL;
    img.id = "city-img";
    imgDiv.appendChild(img);
    divElement.appendChild(imgDiv);

    // details
    const detailDiv = document.createElement('div');
    detailDiv.id = "weather-status";
    detailDiv.appendChild(createParagraph("city-name", `My trip to: ${document.getElementById('location-input').value}`));
    detailDiv.appendChild(createParagraph("date-view", `Departing:  ${document.getElementById('start-date-input').value}`));
    detailDiv.appendChild(createParagraph("duration", `Duration:  ${Client.calculateDateDuration(document.getElementById('start-date-input').value,
        document.getElementById('end-date-input').value)} days`));
    detailDiv.appendChild(createParagraph('typical-weather', "Typical weather for then is: "));
    detailDiv.appendChild(createParagraph('temp-values', `High: ${data.high_temp},  Low: ${data.low_temp}`));
    detailDiv.appendChild(createParagraph("weather-description", data.description));
    divElement.appendChild(detailDiv);
    document.body.appendChild(divElement);
}

const createParagraph = (id, innerText) => {
    const p = document.createElement('p');
    p.id = id;
    p.innerText = innerText;
    return p;
}