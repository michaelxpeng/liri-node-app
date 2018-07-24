require("dotenv").config();

var keys = require('./keys.js');
var spotify = require('node-spotify-api');
var twitter = require('twitter');
var request = require('request');
var fs = require('fs');
var command = process.argv[2];
var twitterClient = new twitter(keys.twitter);
var spotify = new spotify(keys.spotify);

var title = "";
for (var i = 3; i < process.argv.length; i++) {
  if (i > 3 && i < process.argv.length) {
    title = title + "+" + process.argv[i];
  } else {
    title = title + process.argv[i];
  }
};

switch (command) {
  // my-tweets
  case "my-tweets":
    showTweets();
    break;

  // spotify-this-song
  case "spotify-this-song":
    spotifySong();
    break;

  // movie-this
  case "movie-this":
    omdbMovie();
    break;

  // do-what-it-says
  case "do-what-it-says":
    doWhatItSays();
    break;
}

function showTweets() {
  var params = {
    screen_name: 'fauxmscott'
  };
  twitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var date = tweets[i].created_at;
        console.log("@fauxmscott: " + tweets[i].text + " Created At: " + date.substring(0, 19));

        fs.appendFile("log.txt", "@fauxmscott: " + tweets[i].text + " Created At: " + date.substring(0, 19) + "\n", function () { });
      };
    }
    else {
      console.log("Error occurred.");
    };
  });

};

function spotifySong() {
  spotify.search({
    type: "track",
    query: title,
    limit: 5
  }, function (err, data) {
    if (!err) {
      for (var i = 0; i < data.tracks.items.length; i++) {
        var trackData = data.tracks.items[i];

        console.log("Artist: " + trackData.artists[0].name);
        console.log("Song: " + trackData.name);
        console.log("Preview URL: " + trackData.preview_url);
        console.log("Album: " + trackData.album.name);

        fs.appendFile("log.txt", "Artist: " + trackData.artists[0].name + "\n", function () { });
        fs.appendFile("log.txt", "Song: " + trackData.name + "\n", function () { });
        fs.appendFile("log.txt", "Preview URL: " + trackData.preview_url + "\n", function () { });
        fs.appendFile("log.txt", "Album: " + trackData.album.name + "\n", function () { });
      }
    }
    else {
      console.log("Error occurred.");
    };
  });
};

function omdbMovie() {

  request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    if (!error && response.statusCode === 200) {
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);

      fs.appendFile("log.txt", "Title: " + body.Title + "\n", function () { });
      fs.appendFile("log.txt", "Release Year: " + body.Year + "\n", function () { });
      fs.appendFile("log.txt", "IMdB Rating: " + body.imdbRating + "\n", function () { });
      fs.appendFile("log.txt", "Country: " + body.Country + "\n", function () { });
      fs.appendFile("log.txt", "Language: " + body.Language + "\n", function () { });
      fs.appendFile("log.txt", "Plot: " + body.Plot + "\n", function () { });
      fs.appendFile("log.txt", "Actors: " + body.Actors + "\n", function () { });
    }
    else {
      console.log("Error occurred.");
    };
  });
}

function doWhatItSays() {
  if (command === "do-what-it-says") {
    fs.readFile('random.txt', "utf8", function (error, data) {
      if (!error) {
        var text = data.split(',');
        console.log(text[1]);
        title = text[1];
        spotifySong(title);
      }
      else {
        console.log("Error occurred.");
      };
    });
  };
}