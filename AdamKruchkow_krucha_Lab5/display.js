var tweetList = [];

// Initialize Angular.js
var app = angular.module("application",[]);
app.controller("controller", function($scope, $http) {

});

// Function to read in the tweets JSON file (created through the streaming API)
function readJSON() {
  $.ajax({
    type : "GET",
    url : "resources/tweets.json",
    dataType : "json",
    
    success : function(responseData, status) {
      for (var i = 0; i < responseData.length; i++) {
        tweetList.push(responseData[i]);
      }
      displayTweets();
      
    }, 
    // Handle errors
    error: function(msg) {
      alert("Failed to load JSON file");
    }
    
  });
}

// Function to display tweets in html
function displayTweets() {

  // Dynamically generate rows of tweets
  var fullString = "";
  for (var i = tweetList.length-1; i > tweetList.length-1-$("#quantity").val(); i--) {
    fullString += makeRow(tweetList[i]);
  }
  $("#tweets").html(fullString);

} 

// Function to make a row based off a tweet object --- o
function makeRow(tweetObj) {
  var string = "";
  string += "<div class='tweet row'>"
    
  string += "<div class='textArea allAreas col-md-6'>"
  string += tweetObj.text;
  string += "</div>"
    
  string += "<div class='hashArea allAreas col-md-6'>"
  for (var i = 0; i < tweetObj.entities.hashtags.length; i++) {
      string += "#" + tweetObj.entities.hashtags[i].text;
      if (i != tweetObj.entities.hashtags.length - 1) {
        string += ", ";
      }
  }
  string += "</div>"
    
  string += "</div>"
  
  return string;
};