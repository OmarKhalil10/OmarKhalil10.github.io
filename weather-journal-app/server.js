// create an empty JavaScript object
projectData = {};

// Express to run server & routes 
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */ 
const bodyParser = require("body-parser");

/* MiddleWare */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance 
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));
app.use(express.static('Background-music'));
const port = 8000;

// Spin up the server
app.listen(port, listening);

function listening() {
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

// line of code that will get our JavaScript object when the GET request is made.
function gathering (request, response) {
    response.send(projectData);
}

// GET Route
app.get("/all", gathering);

// line of code that will post our JavaScript object when the send request is made.
const dataSend = (request, response) => {
    projectData = request.body;
    console.log(projectData);
    response.send('POST received');
    response.send(projectData);
}

// POST method route
app.post("/add", dataSend);


