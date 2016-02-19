Micro Weather
-------------

My goal was to make the app compact (mobile-friendly) and aesthetically pleasing.

The program makes two API calls, one for the current weather and one for the forecast.  The current weather is displayed, and the user can scroll through previews for the next five days.

The user's initial location is based on HTML geolocation, but afterwards the user can enter a zip code to check a different area. Incorrect zip codes are rejected.

Bootstrap is used for the buttons and layout.  The browser window can be resized to very small sizes and still display well.

=============================

A NOTE ON OPENWEATHERMAP

The API is unfortunately unreliable.  If for some reason only half the information displays, or the program erroneously notes an invalid zip code, it is because the API calls only worked once.  If this happens, wait a little while and refresh (it is on their end).

API issues aside, the program runs without error.