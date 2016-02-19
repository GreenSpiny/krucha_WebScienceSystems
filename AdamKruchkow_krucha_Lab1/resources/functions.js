var jsonIndex = 0;    // Place in json file
var jsonLength = 0;   // Length of json file
var tweets = [];      // Current set of tweets
var initial = true;   // Initialization flag

// Tweet object
function tweet(image, username, text, url, hashtags) {
  this.image = image;
  this.username = username;
  this.text = text;
  this.url = url;
  this.hashtags = hashtags;
};

// Initial functionality
$(document).ready(function() {
  
  // Read in initial tweets
  readJSON();

  // Click to visit original tweet
  $("#tweetArea button").click(function() {
    window.location = $(this).attr("url");
  });
  
});

// Read a set of tweets from a file
function readJSON() {
  $.ajax({
      type : "GET",
      url : "resources/tweetsFromTwitter.json",
      dataType : "json",
      
      success : function(responseData, status) {
      jsonLength = responseData.length;

      // Read six tweets into an array of tweet objects
      // If we reach the end of the file, wrap back to the start
      var current = 0;
      var overflow;
      for (var i = jsonIndex; i < jsonIndex + 6; i++) {
        overflow = i; if (overflow >= jsonLength) {overflow -= jsonLength;}
        var item = responseData[overflow];
        tweets[current] = new tweet(item.user.profile_image_url,item.user.name,item.text,"https://twitter.com/anyuser/status/" + item.id_str,item.entities.hashtags);
        current++;
      }
   
      // Keep track of our place in the file
      jsonIndex++;
      
      // Ensure first load is synchronized
      if (initial) {setJSON(); readJSON(); initial = false;}
      
      }, 
      // Handle errors
      error: function(msg) {
        alert("Failed to load JSON file");
      }
    
    });
}

// Set the on-screen button text from the tweet objects
function setJSON() {
  $("#tweetArea button").each(function(index) {
    var current = tweets[tweets.length-index-1];
    
    // Set button content
    $(this).html(current.text);
    $(this).attr("url",current.url);
    
    
    // If there are no hashtags, update tooltip
    if (current.hashtags.length == 0) {
      $(this).attr("title", "no tags").tooltip("fixTitle");
    }
    
    // If there are hashtags, update tooltip    
    else {
      var string = "";
      for (var i = 0; i < current.hashtags.length; i++) {
        string += "#";
        string += current.hashtags[i].text;
        if (i < current.hashtags.length - 1) {
          string += ", ";
        }
      }
      $(this).attr("title", string).tooltip("fixTitle");
    }
  
  });
  
  // Set profile image
  $("#userIcon").attr("src",tweets[0].image);
  
  // Set user name
  $("h2").html("<i>" + tweets[0].username + "</i>");
 
}

// Catch missing profile pictures
function noImage(self) {
  $(self).attr("src","resources/profileIcon.png");
}

// Animate the html elements, then load in the next set of tweets
function animate() {
  
  // Buttons move down
  $("#tweetArea button").animate({
    top: "+=70",
    }, {duration: 500, queue: false, done: function() {} 
  });
  
  // Bottom button moves to center
  $("#t4").animate({
    top: "85px",
    left: "275",
    width: "500px",
    height: "120px",
    fontSize: "20px"
    }, {duration: 500, queue: false, done: function() {} 
  });
  
  // Center button fades out
  $("#t5").animate({
    top: "85px",
    left: "275",
    width: "500px",
    height: "120px",
    opacity: "0"
    }, {duration: 500, queue: false, done: function() {
    readJSON();
    $("#tweetArea button").removeAttr("style");
    setJSON();
    }
    
  });
}

// Update every three seconds
setInterval(animate, 3000);