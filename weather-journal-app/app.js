//Global variables:
const contentInfo = document.getElementById("content");
const dateInfo = document.getElementById("date");
const regionInfo = document.getElementById("region");
const tempInfo = document.getElementById("temp");
const descriptionInfo = document.getElementById("description");
const countryInfo = document.getElementById("country");
const humidityInfo = document.getElementById("humidity");
const coordsLonInfo = document.getElementById("coordsLon");
const coordsLatInfo = document.getElementById("coordsLat");
const pressureInfo = document.getElementById("pres");
const baseInfo = document.getElementById("base");
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const iconInfo = document.getElementById("icon");

// related to audio code 
const button = document.querySelector(".button");
const audio = document.querySelector("audio");

// Creating a new date instance dynamically with JS
let d = new Date();

// using toDateString() method to get the current date description instead of [ d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear() ] method. 
let newDate = d.toDateString();

// server URl
const wheatherAppServer = "http://127.0.0.1:8000";

// the base URL for Us region
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// the API Key 
const apiKey = ",&appid=0bef3d56110d4a819da17d76472cfefe&units=imperial";
// note: you can use = metric at the end of the api key to make it import temp data in celcius.

// Event listener to add function to existing HTML DOM element
const btn = document.getElementById("generate");
btn.addEventListener("click", performAction);

//Error Function.
const error = function (){
    console.error('Error has occurred: ', error);
};

//Post Data Function:
function performAction() {

let zipCode = zip.value;
let feels = feelings.value;

    recieveData(zipCode)
    .then(function (wheatherApiResponse){
    
    // get the data from the api
    const {name} = wheatherApiResponse;
    const {temp,humidity,pressure} = wheatherApiResponse.main;
    const {lon,lat} = wheatherApiResponse.coord;
    const stBase = wheatherApiResponse.base;
    const  {country} = wheatherApiResponse.sys;
    const [{main}] = wheatherApiResponse.weather;
    const {icon} = wheatherApiResponse.weather[0];


    // post the data after checking it.
    dataSend(wheatherAppServer + "/add", {newDate, name, temp: Math.floor(temp), main, icon, country, humidity, stBase, pressure, lon, lat, feels,});
    
    // upadating the user interface (UI):
    updateUI();
    
    //  add smooth opacity to the entry when after clicking the 'generate' button. 
    const showEntryData = document.querySelector('#entry');
    showEntryData.style.opacity=1; 
    
});
};

//Function to GET Web API Data
const recieveData = async function (zipCode) {
try {
    const response = await fetch(baseURL + zipCode + apiKey);
    const wheatherApiResponse = await response.json();
    
    // ckeck for errors.
    if (wheatherApiResponse.cod != 200) {
        // display error message in case of invalid data. 
        alert("Please enter a valid zip code");
        throw new Error("No weather found.");
    }
    
    //throw the catched error.
    return wheatherApiResponse;
} catch (error) {
}
};

// line of code that will post our JavaScript object when the send request is made.
// POST method function:
const dataSend = async function (url = "", details = {}) {

const response = await fetch(url, {
    
    method: "POST",
    credentials: 'same-origin', 
    headers: {"Content-Type": "application/json",},
    
    body: JSON.stringify(details),
});

try {
    const newData = await response.json();

    //print to the console and update data
    console.log("You have successfully saved your new data:", newData);

    //return the new data values.
    return newData;

    //catch occured error (if exist).
} catch (error) {}
};

// using (updateUI) async function.

async function updateUI () {

    // waiting for the response.
const response = await fetch(wheatherAppServer + "/all");

    // using try-catch method to capture the data and print in into my html page.

try {
    const allData = await response.json();
    
    // update feelings.
    contentInfo.innerHTML = allData.feels;
    
    // update the current date.
    dateInfo.innerHTML = `Date: ${allData.newDate}`;
    
    // update targetted region.
    regionInfo.innerHTML = `City: ${allData.name}`;
    
    // update the city temp.
    tempInfo.innerHTML = `Temperature is: ${allData.temp}\u2109`;
    
    // update the weather description.
    descriptionInfo.innerHTML = `Status: ${allData.main}`;
    
    // update (region) the country we have searched in.
    countryInfo.innerHTML = `Country: ${allData.country}`;
    
    // update humidity value.
    humidityInfo.innerHTML = `Humidity: ${allData.humidity} %`;  
    
    // update Longitude Coordinates value.
    coordsLonInfo.innerHTML = `Coordinates: Lon:(${allData.lon})`;  
    
    // update latitude value.
    coordsLatInfo.innerHTML = `Lat:(${allData.lat})`;  
    
    // update pressure value. 
    pressureInfo.innerHTML = `pressure: ${allData.pressure} mb`;   
    
    // update base value. 
    baseInfo.innerHTML = `Base: ${allData.stBase}`;  
    
    // throw an error using (catch method).
    
    // update the icon description.
    iconInfo.src = "http://openweathermap.org/img/wn/" + allData.icon + ".png";

} catch (error) {
}
};

// audio code
button.addEventListener("click", function (){
    if (audio.paused) {
        
        // start with half value of the original volume.  
        audio.volume = 0.5;
        audio.play();
    
} else {
    audio.pause();
}
/* this is where you can add a class list with any effect to the play button */
}); 

