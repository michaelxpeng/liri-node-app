require("dotenv").config();

var keys = require('./keys.js');
var spotify = require('node-spotify-api');
var twitter = require('twitter');
var request = require('request');
var fs = require('fs');
var command = process.argv[2];
var client = new twitter(keys.twitter);
var spotify = new spotify(keys.spotify);

var title = "";
for (var i = 3; i < process.argv.length; i ++) {
  if (i > 3 && i < process.argv.length){
    title = title + "+" + process.argv[i];
  } else {
    title = title + process.argv[i];
  }
};

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
if (command === "spotify-this-song") {
  spotifySong();
};

function spotifySong (){
  spotify.search({ type: 'track', query: title, limit: 5 }, function(err, data) {
    if (!err) {
      for(var i = 0; i < data.tracks.items.length; i++){
        var trackData = data.tracks.items[i];

        console.log("Artist: " + trackData.artists[0].name);
        console.log("Song: " + trackData.name);
        console.log("Preview URL: " + trackData.preview_url);
        console.log("Album: " + trackData.album.name);
      }
    }
  });
};

// movie-this
if (command === "movie-this"){
  omdbCommand();
};

function omdbCommand() {

  request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    if (!error && response.statusCode === 200) {
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
    }
  });
}

// do-what-it-says