require("dotenv").config();

var keys = require('./keys.js');
var spotify = require('node-spotify-api');
var twitter = require('twitter');
var request = require('request');
var fs = require('fs');
var command = process.argv[2];

// my-tweets

// spotify-this-song


// movie-this
if (command === "movie-this"){
  omdbCommand();
};

function omdbCommand() {

  request("http://www.omdbapi.com/?t=frozen&y=&plot=short&apikey=trilogy", function(error, response, body) {

    if (!error && response.statusCode === 200) {

      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMdB Rating: " + JSON.parse(body).imdbRating);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

// do-what-it-says

