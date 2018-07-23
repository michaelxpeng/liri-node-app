require("dotenv").config();

var keys = require('./keys.js');
var spotify = require('node-spotify-api');
var twitter = require('twitter');
var request = require('request');
var fs = require('fs');
var command = process.argv[2];
var client = new twitter(keys.twitter);

// my-tweets
if (command === "my-tweets"){
  showTweets();
};

function showTweets() {
  var params = {screen_name: 'fauxmscott'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(var i = 0; i<tweets.length; i++){
        var date = tweets[i].created_at;
        console.log("@fauxmscott: " + tweets[i].text + " Created At: " + date.substring(0, 19));
      }
    }
  });
  
};

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

