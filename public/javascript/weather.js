const API_KEY = "56c968e1c551305987108868fe4d8eb6";

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {

    bindShowWidgetButton();
  
}

function bindShowWidgetButton() {

    document.getElementById('showWeather').addEventListener("click", (event) => {
        
        initWidget();
        bindGetWeatherButton();
        event.preventDefault();
    });

}

function bindGetWeatherButton() {

    document.getElementById('getWeather').addEventListener("click", (event) => {

        let CITY_NAME = document.getElementById('CITY_NAME').value;
        let STATE = document.getElementById('STATE').value;
        let ZIP_CODE = document.getElementById('ZIP_CODE').value;
        let COUNTRY_CODE = document.getElementById('COUNTRY_CODE').value;


        let req = new XMLHttpRequest();
        let URL = undefined;

        if(ZIP_CODE) {
            URL = `http://api.openweathermap.org/data/2.5/weather?zip=${ZIP_CODE},${COUNTRY_CODE}&units=imperial&appid=${API_KEY}`;
        } else  {
            if(STATE) {
                URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME},${STATE},${COUNTRY_CODE}&units=imperial&appid=${API_KEY}`;
            } else {
                URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=imperial&appid=${API_KEY}`;
            }
        }
        console.log(URL);

        req.open("GET", URL, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.addEventListener('load', () => {
            if(req.status >= 200 && req.status < 400) {

                let response = JSON.parse(req.responseText);
                console.log((response));
                document.getElementById('status').textContent = "It is currently ";
                document.getElementById('temp').textContent = Math.floor(response["main"]["temp"]) + " F ";
                document.getElementById('condition').textContent = "with " + response["weather"][0]["description"];
                document.getElementById('city').textContent = response["name"];
                document.getElementById('temp-max').textContent = "Today's high was " + response["main"]["temp_max"] + " F";
                document.getElementById('temp-min').textContent = " with a low of " + response["main"]["temp_min"] + " F.";

            } else {
                console.log("Error in request: " + req.statusText);
            }
        });

        req.send(null);
        console.log(JSON.parse(req.responseText));
        event.preventDefault();

    });

}

// Create and insert a form for user location for weather API into document
function initWidget(){

    let newEl, city, state, zip, country, button, text, form, widget;

    widget = document.getElementById('weatherWidget');

    form = document.createElement('form');
    form.className = 'get-Form';
    widget.appendChild(form);
    form.style.margin = '20px auto';

    // Create Table Header & Body HTML5
    newEl = document.createElement('h4');
    text = document.createTextNode('Weather Widget');
    newEl.appendChild(text);
    form.appendChild(newEl);

    //
    city = document.createElement('input');
    city.id = 'CITY_NAME', city.name = 'CITY_NAME', city.placeholder = 'Seattle', city.value = 'Seattle', city.type = 'text';
    form.appendChild(city);

    state = document.createElement('input');
    state.id = 'STATE', state.name = 'STATE', state.placeholder = 'WA', state.value = 'WA', state.type = 'text';
    form.appendChild(state);

    zip = document.createElement('input');
    zip.id = 'ZIP_CODE', zip.name = 'ZIP_CODE', zip.placeholder = '98198', zip.type = 'text';
    form.appendChild(zip);

    country = document.createElement('input');
    country.id = 'COUNTRY_CODE', country.name = 'COUNTRY_CODE', country.placeholder = 'US', country.value = 'US', country.type = 'text';
    form.appendChild(country);

    button = document.createElement('button');
    button.id = 'getWeather';
    text = document.createTextNode('Submit');
    button.appendChild(text);
    form.appendChild(button);

}
