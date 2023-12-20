const http = require('http');
const fs = require("fs");
const bodyParser = require("body-parser"); /* To handle post parameters */
const portNumber = 4000;
const httpSuccessStatus = 200;
const path = require("path");
const express = require("express"); /* Accessing express module */
const app = express(); /* app is a request handler function */

require("dotenv").config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') })
const uri = process.env.MONGO_CONNECTION_STRING;
const databaseAndCollection = {db: "StarWars", collection:"starwars"};
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

async function getStarWars(searchType, searchName) {
    var data = await fetch(`https://swapi.dev/api/${searchType}/?search=${searchName}`)
    .then((response) => response.json())
    let message = "<table border='1'><tr><th>Meta-Data</th><th>Value</th></tr>"
    if (searchType == "people") {
        message += `<tr><td>Name</td><td>${data.results[0].name}</td></tr>` +
                `<tr><td>Height</td><td>${data.results[0].height}</td></tr>` +
                `<tr><td>Mass</td><td>${data.results[0].mass}</td></tr>` +
                `<tr><td>Hair Color</td><td>${data.results[0].hair_color}</td></tr>` +
                `<tr><td>Skin Color</td><td>${data.results[0].skin_color}</td></tr>` +
                `<tr><td>Eye Color</td><td>${data.results[0].eye_color}</td></tr>` +
                `<tr><td>Birth Year</td><td>${data.results[0].birth_year}</td></tr>` +
                `<tr><td>Gender</td><td>${data.results[0].gender}</td></tr>` +
                `<tr><td>Homeworld</td><td>${data.results[0].homeworld}</td></tr>` +
                `<tr><td>Films</td><td>${data.results[0].films}</td></tr>` +
                `<tr><td>Species</td><td>${data.results[0].species}</td></tr>` +
                `<tr><td>Vehicles</td><td>${data.results[0].vehicles}</td></tr>` +
                `<tr><td>Starships</td><td>${data.results[0].starships}</td></tr>`
    } else if (searchType == "planets") {
        message += `<tr><td>Name</td><td>${data.results[0].name}</td></tr>` +
        `<tr><td>Rotation Period</td><td>${data.results[0].rotation_period}</td></tr>` +
        `<tr><td>Orbital Period</td><td>${data.results[0].orbital_period}</td></tr>` +
        `<tr><td>Diameter</td><td>${data.results[0].diameter}</td></tr>` +
        `<tr><td>Climate</td><td>${data.results[0].climate}</td></tr>` +
        `<tr><td>Gravity</td><td>${data.results[0].gravity}</td></tr>` +
        `<tr><td>Terrain</td><td>${data.results[0].terrain}</td></tr>` +
        `<tr><td>Surface Water</td><td>${data.results[0].surface_water}</td></tr>` +
        `<tr><td>Population</td><td>${data.results[0].population}</td></tr>`
    } else if (searchType == "films") {
        message += `<tr><td>Title</td><td>${data.results[0].title}</td></tr>` +
        `<tr><td>Episode ID</td><td>${data.results[0].episode_id}</td></tr>` +
        `<tr><td>Opening Crawl</td><td>${data.results[0].opening_crawl}</td></tr>` +
        `<tr><td>Director</td><td>${data.results[0].director}</td></tr>` +
        `<tr><td>Producer(s)</td><td>${data.results[0].producer}</td></tr>` +
        `<tr><td>Release Date</td><td>${data.results[0].release_date}</td></tr>`
    } else if (searchType == "species") {
        message += `<tr><td>Name</td><td>${data.results[0].name}</td></tr>` +
        `<tr><td>Classification</td><td>${data.results[0].classification}</td></tr>` +
        `<tr><td>Designation</td><td>${data.results[0].designation}</td></tr>` +
        `<tr><td>Average Height</td><td>${data.results[0].average_height}</td></tr>` +
        `<tr><td>Skin Colors</td><td>${data.results[0].skin_colors}</td></tr>` +
        `<tr><td>Hair Colors</td><td>${data.results[0].hair_colors}</td></tr>` +
        `<tr><td>Eye Colors</td><td>${data.results[0].eye_colors}</td></tr>` +
        `<tr><td>Average Lifespan</td><td>${data.results[0].average_lifespan}</td></tr>` +
        `<tr><td>Homeworld</td><td>${data.results[0].homeworld}</td></tr>` +
        `<tr><td>Language</td><td>${data.results[0].language}</td></tr>`
    } else if (searchType == "vehicles") {
        message += `<tr><td>Name</td><td>${data.results[0].name}</td></tr>` +
        `<tr><td>Model</td><td>${data.results[0].model}</td></tr>` +
        `<tr><td>Manufacturer</td><td>${data.results[0].manufacturer}</td></tr>` +
        `<tr><td>Cost in Credits</td><td>${data.results[0].cost_in_credits}</td></tr>` +
        `<tr><td>Length</td><td>${data.results[0].length}</td></tr>` +
        `<tr><td>Max Atmosphering Speed</td><td>${data.results[0].max_atmosphering_speed}</td></tr>` +
        `<tr><td>Crew</td><td>${data.results[0].crew}</td></tr>` +
        `<tr><td>Passengers</td><td>${data.results[0].passengers}</td></tr>` +
        `<tr><td>Cargo Capacity</td><td>${data.results[0].cargo_capacity}</td></tr>` +
        `<tr><td>Consumables</td><td>${data.results[0].consumables}</td></tr>` +
        `<tr><td>Vehicle Class</td><td>${data.results[0].vehicle_class}</td></tr>`
    } else if (searchType == "starships") {
        message += `<tr><td>Name</td><td>${data.results[0].name}</td></tr>` +
        `<tr><td>Model</td><td>${data.results[0].model}</td></tr>` +
        `<tr><td>Manufacturer</td><td>${data.results[0].manufacturer}</td></tr>` +
        `<tr><td>Cost in Credits</td><td>${data.results[0].cost_in_credits}</td></tr>` +
        `<tr><td>Length</td><td>${data.results[0].length}</td></tr>` +
        `<tr><td>Max Atmosphering Speed</td><td>${data.results[0].max_atmosphering_speed}</td></tr>` +
        `<tr><td>Crew</td><td>${data.results[0].crew}</td></tr>` +
        `<tr><td>Passengers</td><td>${data.results[0].passengers}</td></tr>` +
        `<tr><td>Cargo Capacity</td><td>${data.results[0].cargo_capacity}</td></tr>` +
        `<tr><td>Consumables</td><td>${data.results[0].consumables}</td></tr>` +
        `<tr><td>Hyperdrive Rating</td><td>${data.results[0].hyperdrive_rating}</td></tr>` + 
        `<tr><td>MGLT</td><td>${data.results[0].MGLT}</td></tr>` +
        `<tr><td>Starship Class</td><td>${data.results[0].starship_class}</td></tr>`
    } 
    
    message += "</table>"

    return message
}

process.stdin.setEncoding("utf8");

app.set("views", path.resolve(__dirname, "templates"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:false}));

app.get("/", async (request, response) => { 

    const variables = {
        history: await listSearches(client, databaseAndCollection)
    }

    response.render("index", variables);
});

app.get("/about", async (request, response) => { 
    response.render("about");
});

app.get("/documentation", async (request, response) => { 
    response.render("documentation");
});

app.post("/queryinfo", async (request, response) => {
    let searchType = request.body.searchType
    let searchName = request.body.searchName

    let result = await getStarWars(searchType, searchName)

    client.connect();

    
    const vars = {
        search: searchName,
    };

    insertSearch(client, databaseAndCollection, vars);

    const variables = {
        table: result,
    };

    response.render("queryinfo", variables);
})

app.post("/clear", async (request, response) => { 
    client.connect();
    const result = await client.db(databaseAndCollection.db)
    .collection(databaseAndCollection.collection)
    .deleteMany({});
});

async function insertSearch(client, databaseAndCollection, search) {
    const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(search);
}

async function listSearches(client, databaseAndCollection) {
    let filter = {};
    const cursor = client.db(databaseAndCollection.db)
    .collection(databaseAndCollection.collection)
    .find(filter);
    
    const result = await cursor.toArray();  


    message = "<table border='1'><tr><th>Search History</th></tr>"
    result.forEach(element => {
        message += `<tr><td>${element.search}</td></tr>`
    });

    message += "</table>"

    return message  
}

app.listen(portNumber);

console.log(`Web server started and is running at http://localhost:${portNumber}`);

