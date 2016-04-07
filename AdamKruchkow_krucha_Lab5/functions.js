// ExpressJS setup
var express = require('express');
var app = express();
app.use(express.static(__dirname));

// HTML setup
var http = require('http');
var fs = require('fs');

// Twitter setup
var twitter = require('twitter');
var client = new twitter({
  consumer_key: 'ju6TYt0prSTwf2RnZ3dBT7cX4',
  consumer_secret: 'VkpFQ8Jd0NRrbF5iDp63pcfCB5YMg40SYDej8zXjFVSh5Cmr3o',
  access_token_key: '704026379814367232-VkffkJ9ceQnQHiJyDIfdoR3YtKrlWx7',
  access_token_secret: 'QuNDvPJG5dpeQXguj9SdLY1Q7PP8lUGmqegfnkVnK4h3X'
});

// ============================================================================== //

// Store all Tweets in an array
var maxLength = 100;
var tweetArray = [];

// Store location for convenience
var southEast = "-74,40";
var northWest = "-73,41";

// Stream Tweets from Twitter
client.stream('statuses/filter', {locations: southEast + "," + northWest}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
    tweetArray.push(tweet);
    if (tweetArray.length > maxLength) {
      tweetArray.shift();
    }
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});

// Write tweets to a file at a reasonable pace
function writeJSON() {
  var string = JSON.stringify(tweetArray);
  fs.writeFileSync("resources/tweets.json",string);
  setTimeout(writeJSON,250);
}
writeJSON();

// Server confirmation
app.listen(3000, function () {
  console.log('Listening for Tweets!');
  console.log('---------------------');
});