var tweets = null;

// Begin by reading in tweets
getTweets();

// When ready, display and begin filtering tweets
$(document).ready(function(){
  displayTweets();
  searchTweets();
});

// Function to initialize Angular.js and read in tweets --- o
function getTweets() {

  var app = angular.module("application",[]);
  app.controller("controller", function($scope, $http) {
    $http.get("get_tweets.php", {params:{"q":"q"}}).then(function(response) {
      tweets = response.data;
      console.log(tweets);
    });
  });

};

// Function to display tweets --- o
function displayTweets() {

  if (tweets == null) {
    setTimeout(displayTweets, 20);
    return;
  }

  // Dynamically generate rows of tweets
  var fullString = "";
  for (var i = 0; i < tweets.statuses.length; i++) {
    fullString += makeRow(tweets,i);
  }
  $("#tweets").html(fullString);

} 

// Function to make a row, based off a tweet object --- o
function makeRow(tweetObj,index) {
  var string = "";
  string += "<div class='tweet row'>"
    
  string += "<div class='textArea allAreas col-md-6'>"
  string += tweetObj.statuses[index].text;
  string += "</div>"
    
  string += "<div class='hashArea allAreas col-md-6'>"
  for (var i = 0; i < tweetObj.statuses[index].entities.hashtags.length; i++) {
      string += "#" + tweetObj.statuses[index].entities.hashtags[i].text;
      if (i != tweetObj.statuses[index].entities.hashtags.length - 1) {
        string += ", ";
      }
  }
  string += "</div>"
    
  string += "</div>"
  
  return string;
};

// Function to filter tweets by query (not case sensitive) --- o
function searchTweets() {
  $(".tweet").each(function() {

    var found = true;
  
    // Search tweets
    var text = $(this).children(".textArea").html().toLowerCase();
    if ($("#allText").val() != "" && text.search($("#allText").val().toLowerCase()) != -1) {
      $(this).children(".textArea").addClass("yellow");
    }
    else {
      $(this).children(".textArea").removeClass("yellow");
      if ($("#allText").val() != "") { found = false; }
    }
    
    // Search hashes
    var text = $(this).children(".hashArea").html().toLowerCase();
    if ($("#hashText").val() != "" && text.search($("#hashText").val().toLowerCase()) != -1) {
      $(this).children(".hashArea").addClass("yellow");
    }
    else {
      $(this).children(".hashArea").removeClass("yellow");
      if ($("#hashText").val() != "") { found = false; }
    }
    
    // Hide if none found
    if (found) {
      $(this).show();
    }
    else {
      $(this).hide();
    }
    
  });
  
  // Check periodically
  setTimeout(searchTweets, 20);
}