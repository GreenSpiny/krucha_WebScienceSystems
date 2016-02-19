var APIkey = "24e7a033ae700feb54320ea6ec4281df";  // My unique OpenWeatherMap API key
var index = 0;                                    // Current day being viewed in the forecast
var forecast = null;
var today = new Date();
var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// Initialization
$(document).ready(function() {

  // First, try weather by geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoPlace);
  }
  
  // If that fails, try weather by a default zip code
  else {
    getWeather(zip,"code");
  }
 
 });
 
 // Helper function to call getWeather using latitude and longitude.
 function geoPlace(pos) {
  var temp = "lat=" + pos.coords.latitude + "&lon=" + pos.coords.longitude;
  getWeather(temp,"geo");
 }

// Main function.  Given a zip code or a coordinate pair, get the current weather and the forecast.
// This requires two consecutive calls to the API.
function getWeather(input,type) {

  var APIstring;
  var APIforecast;
  var resp;
  
  if (type == "code") {
    APIstring = "http://api.openweathermap.org/data/2.5/weather?zip=" + input +",us&units=imperial&APPID=" + APIkey;
    APIforecast = "http://api.openweathermap.org/data/2.5/forecast?zip=" + input +",us&units=imperial&APPID=" + APIkey;
  }
  else {
    APIstring = "http://api.openweathermap.org/data/2.5/weather?" + input +"&units=imperial&APPID=" + APIkey;
    APIforecast = "http://api.openweathermap.org/data/2.5/forecast?" + input +"&units=imperial&APPID=" + APIkey;
  }
  
  // Get the current weather
  $.ajax({
    type : "GET",
    url : APIstring,
    dataType : "jsonp",
    
    success : function(responseData1, status1) {
      $("#submit").html("Submit");
      writeData(responseData1);
    },
    // Handle errors
    error: function(msg1) {
      $("#submit").html("Invalid zip code.");
    }
  });
  
  // Get the forecast
  $.ajax({
    type : "GET",
    url : APIforecast,
    dataType : "jsonp",
    
    success : function(responseData2, status2) {
      forecast = responseData2;
      writeForecast();
      
    },
    // Handle errors
    error: function(msg2) {
      $("#submit").html("Invalid zip code.");
    }
  });
  
}

// Function to display the current weather on the screen
function writeData(input) {
  $("#precipitation").html(input.weather[0].main);
  $("#temperature").html(Math.round(input.main.temp) + "&#8457");
  $("#name").html(input.name);
  $("#wind").html("Wind: " + input.wind.speed + " mph");
  $("#humidity").html("Humidity: " + input.main.humidity + "%");

}

// Function to display the forecast on the screen
function writeForecast() {
  
  // Get the correct day in the forecast
  if (forecast == null) {return;}
  var ind = index * 8;
  if (ind >= forecast.list.length) {ind = forecast.list.length-1;}
  
  // Display the forecast info
  $("#smallTemp").html(forecast.list[ind].main.temp);
  $("#smallPrecip").html(forecast.list[ind].weather[0].main);
  
  // Display the forecast day
  var tempDay = new Date(today.getFullYear(),today.getMonth(),today.getDate()+index+1);
  if (index == 0) {
    $("#day").html("Tomorrow");
  }
  else {
    $("#day").html(dayNames[tempDay.getDay()]);
  }
  
}

// Function to scroll through days in the forecast
function scroll(val) {
  index += val;
  if (index < 0) {index = 0;}
  if (index > 4) {index = 4;}
  writeForecast();
}

// Function to submit a zip code, and calls the weather API
function submit() {
  var temp = $("#zipBox").val();
  if (temp.length == 5) {
    getWeather(temp,"code");
  }
  else {
    $("#submit").html("Invalid zip code.");
  }
}