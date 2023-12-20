## Title: Star Wars Database

## Description: 
This product allows users to search for more in-depth information on their favorite Star Wars people, planets, 
films, vehicles, starships, and species.
Users can also clear their search history.

## Description of Target: 
Target Browsers The Star Wars database is optimized for a seamless experience on desktop browsers, 
ensuring Star Wars fans can easily access information.

## User Manual: 
Welcome to the User manual. You will be brought to the home page where there is a navigation bar at the top taking you to any of the pages including the 
home page, documentation, and an about page. On the home page users can search for any information they desire from any of the given Star Wars categories. 
This includes people, planets, starships, vehicles, films, and species. Users must use the search bar AND check one of the boxes to find what they're searching for. After entering a query and seeing the display information, the user can go back to the index page and write more queries for more information. The search 
results are stored in MongoDB displayed on the index page. With each query, the search result gets added to the search history. The user can clear the search history as well (but keep in mind the display will not be updated until the user enters in another query).

## Developer Manual
### (1) Introduction
This Developer Manual is crafted for Star Wars fans who have technical knowledge about web applications. 
While not delving into system design intricacies, it provides a comprehensive guide for setting up the application, running tests, 
and understanding the API structure. 

### (2) Start Up
Clone the link on this Github page to your local repository, go to that location in your terminal. You should be in the folder that contains all the files
for this project.


### (3) Dependencies
Here, we assume the user does not have the node_modules folder, package.json, or package-lock.json. To create the package.json file, run 'npm init' and press 
enter (assuming default values) until the file has been created. Now, run a series of 'npm install <dependency> statements to install the dependencies for
this project (if you already had the package.json file and did not need to run 'npm init', then just run 'npm install' - by default, this will install all the
dependencies listed in package.json). Once all the dependencies are installed, you should see that the 'node_modules' folder and 'package-lock.json file have 
been automatically created. Now you're ready to run the program

### (4) Run Application on the Server
To run the application, open up the terminal (in the location of your repository for this project) and type 'node starwars.js'. Once this code is run,
you'll see output in the terminal showing the web server has started and is running at the following localhost link. Click on this link. Now you have 
access to the Star Wars database product and can use it.

### (5) Running Tests
To run tests, make sure to add Log statements to the console within appropriate end-points / function calls. 

### (6) API, GET & POST endpoints
The API used by this program is the SWAPI (Star Wars API). This API contains all the Star Wars information a fan may want on anything Star Wars. This 
include characters, planets, films, species, vehicles, and starships. The base URL for the API is as follows: https://swapi.dev/api/. Rate limiting is 
limited to 10,000 API requests per day. The API is an open API, no authentication is required, and supports a JSON schema. The API utilizes a search parameter
that filters the set of resources returned. Here's an example of a query that utilizes these search parameters: https://swapi.dev/api/people/?search=r2.

--- app.get('/') --> this function routes the HTTP GET requests to the home/index page path for which the middleware function is being called. Here, the home 
web page is dynamically loaded (including the Search History table implemented via MongoDB - this is checked with every GET request to the home page, as 
at any point the user can reset the MongoDB database)

--- app.post('queryinfo') --> this function routes the HTTP POST requests to the specified path (queryinfo) with the specified callback functions. Here,
the form values of the index page are captured and passed into 'getStarWars' function, which is where the appropriate FETCH call is made to access the data 
for the specific query inputted. We wait until the FETCH request completes, now we have our data for the request. We then connect to our MongoDB database, which
stores the search history of the queries. We insert a row in the associate MongoDB database representing search history information (the user inputted text). The
data associated with the FETCH request made will be represented as a dynamically generated table (with meta data on the requested entity) in 'queryinfo.ejs'. 

--- app.post('clear') --> this function routes the HTTP POST requests to the specified path (clear) with the specified callback functions. Here, we connect
to our MongoDB and clear the search history by deleting ALL the rows. This occurs when a user clicks on the 'Clear Search History' button (note that the table
display is not updated until after the tables been cleared AND another query has been made).

--- app.get('/about') --> this function routes the HTTP GET requests to the about page path for which the middleware function is being called. Here, the about 
web page is dynamically loaded.

--- app.get('/documentation') --> this function routes the HTTP GET requests to the documentation page path for which the middleware function is being called. Here, the home 
web page is dynamically loaded.

### (7) Known Bugs
--- Make sure you use exact names with proper grammar and spelling, along with being case-sensitive. Test the application on the following inputs to get a
sense of what correct results look like ('Luke Skywalker' - a person, 'Tatooine' - a planet, 'A New Hope' - a film, 'Human' - a species, 'Sand Crawler' - a 
vehicle, 'CR90 corvette' - a starship). Note that the table display is not updated until after the tables been cleared AND another query has been made (repeating
this so the user knows this well). This is not a bug per se but a quirk in the application. 

### (8) Future Development Plans

 (a) Implement Pagination: Enhance character search results by implementing pagination for a smoother exploration experience.

 (b) Enhance Error Handling: Improve error handling for smoother exploration and user experience.

 (c) Integrate Character Images: Explore opportunities to integrate images of Star Wars characters, providing a visual representation 
 alongside textual information.

 (d) Interactive Character Relationships: Develop a feature that illustrates the relationships between characters, allowing users to 
 navigate through the interconnected Star Wars universe.

 (e) Implement a Minigame between characters (Pokemon battle style) - was in a previous iteration for our design